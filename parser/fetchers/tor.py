from os import environ
from bs4 import BeautifulSoup
from time import sleep
from warnings import warn
from requests import session
from stem import Signal
from stem.control import Controller
from stem.connection import authenticate_none, authenticate_password

from base import Fetcher


class TorHelper:
    def __init__(
        self,
        ctrl_port=9051,
        ctrl_pass=None,
        enforce_limit=3,
        enforce_rotate=True,
        n_requests=25,
        socks_port=9050,
        socks_host="localhost",
        test_rotate=False,
    ):
        # Number of requests that have been made since last ip change
        self.req_i = 0
        # The number of consecutive requests made with the same IP.
        self.n_requests = n_requests
        # Enforce rotation of IPs (if true, redraw circuit until IP is changed)
        self.enforce_rotate = enforce_rotate
        # The threshold at which we can stop trying to rotate IPs and accept.
        self.enforce_limit = min(25, enforce_limit)
        # SOCKS5 params
        self.tor_port = socks_port
        self.tor_host = socks_host
        # The tor controller that will be used to receive signals
        self.ctrl_port = ctrl_port
        # The control port password
        self.ctrl_pass = ctrl_pass

        self.__initalize()
        self.ip = self.__check_ip()

    def __initalize(self):
        try:
            self.tor_controller = Controller.from_port(port=self.ctrl_port)
        except Exception as err:
            raise EnvironmentError(err)

        if not self.ctrl_pass and 'TOR_CTRL_PASS' in environ:
            self.ctrl_pass = environ['TOR_CTRL_PASS']

        self._session = session()

    def __check_ip(self):
        proxy = f'socks5h://{self.tor_host}:{self.tor_port}'
        response = self._session.get(
            "https://api.ipify.org/?format=json",
            proxies={
                'http': proxy,
                'https': proxy,
            },
        )
        return response.json()['ip']

    def __check_count(self):
        self.req_i += 1
        if self.req_i > self.n_requests and self.enforce_rotate:
            self.rotate()
            self.req_i = 0

    def __connect(self):
        """
        Attempt to rotate the IP by sending tor client signal NEWNYM.

        Note: this does NOT automatically change the ip. It simply
        draws a new circuit (i.e. a routing table for your requests/responses).
        If the number of relays is small, this may indeed return the same IP.
        That does not mean it is broken!

        Also note that the default control port is 9051, which is different
        from the SOCKS5 port. This port is used to receive signals.
        """
        if self.ctrl_pass:
            authenticate_password(self.tor_controller, self.ctrl_pass)
        else:
            authenticate_none(self.tor_controller)
        self.tor_controller.signal(Signal.NEWNYM)

    def rotate(self):
        count, new_ip = 0, None
        while count < self.enforce_limit:
            self.__connect()
            new_ip = self.__check_ip()
            # If the ip didn't change, we will wait for it
            if new_ip == self.ip and self.enforce_rotate:
                sleep(1)
                count += 1
            else:
                self.ip = new_ip
                break

    def get(self, url, params={}, headers=None, timeout=None):
        proxy = f'socks5h://{self.tor_host}:{self.tor_port}'
        response = self._session.get(
            url,
            params=params,
            headers=headers,
            proxies={
                'http': proxy,
                'https': proxy,
            },
            timeout=timeout,
        )
        self.__check_count()
        return response

    def post(self, url, params={}, headers=None, timeout=None):
        proxy = f'socks5h://{self.tor_host}:{self.tor_port}'
        response = self._session.post(
            url,
            data=params,
            headers=headers,
            proxies={
                'http': proxy,
                'https': proxy,
            },
            timeout=timeout,
        )
        self.__check_count()
        return response


class Tor(Fetcher):
    MAX_REQUEST_COUNT = 100

    def __init__(self, logger):
        super().__init__(logger)
        self.__helper = TorHelper(n_requests=self.MAX_REQUEST_COUNT)
        self.rotate()

    def rotate(self):
        self.__helper.rotate()
        self._logger.info(f'tor fetcher rotation new ip {self.__helper.ip}')

    def fetch(self, htype, query, params={}):
        try:
            self._logger.info(f'''
                tor start fetching from {query}
                with {str(params)}
                on ip {self.__helper.ip}
            ''')
            if htype == self.TYPE_GET:
                response = self.__helper.get(
                    query,
                    params=params,
                    headers=self._headers,
                    timeout=self.DEFAULT_TIMEOUT * 3.0,
                )
            elif htype == self.TYPE_POST:
                response = self.__helper.post(
                    query,
                    params=params,
                    headers=self._headers,
                    timeout=self.DEFAULT_TIMEOUT * 3.0,
                )
            else:
                raise Exception(f'tor doesn\'t supply htype {htype}')
            self._logger.info('fetching done successfully')
            return response
        except Exception as exception:
            self._logger.error(str(exception))
            return None
