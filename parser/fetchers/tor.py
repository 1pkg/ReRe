from sys import path as paths
from os import path
paths.append(path.abspath(path.join(__file__, '..', 'tor', 'src')))

from urllib import parse
from TorCrawler import TorCrawler

from base import Fetcher


class Tor(Fetcher):
    MAX_REQUEST_COUNT = 100

    def __init__(self, logger):
        super().__init__(logger)
        self.__tor = TorCrawler(
            n_requests=self.MAX_REQUEST_COUNT,
            use_bs=False,
        )
        self.rotate()

    def rotate(self):
        self.__tor.rotate()
        self._logger.info(f'tor fetcher rotation new ip {self.__tor.ip}')

    def fetch(self, htype, query, params={}):
        try:
            self._logger.info(f'''
                tor start fetching from {query}
                with {str(params)}
                on ip {self.__tor.ip}
            ''')
            if htype == self.TYPE_GET:
                if params:
                    if '?' in query:
                        query += f'&{parse.urlencode(params)}'
                    else:
                        query += f'?{parse.urlencode(params)}'
                response = self.__tor.get(
                    query,
                    headers=self._headers,
                    timeout=self.DEFAULT_TIMEOUT * 3.0,
                )
            elif htype == self.TYPE_POST:
                response = self.__tor.post(
                    query,
                    data=params,
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
