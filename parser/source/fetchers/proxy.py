from bs4 import BeautifulSoup
from requests import session
from random import randint

from base import Fetcher
from .static import Static


class Proxy(Fetcher):
    PROXIES_URL = 'https://hidemy.name/en/proxy-list/'
    PROXIES_ANON = '34'

    MAX_PROXIES_COUNT = 1024
    MIN_PROXIES_COUNT = 8

    MAX_REQUEST_COUNT = 100

    DEAD_FETCH_TRY_COUNT = 32

    def __init__(self, logger):
        super().__init__(logger)
        self.__session = session()
        self.__static = Static(self._logger)
        self.__proxies = []
        self.__count = self.__index = 0
        self.rotate()

    def __initalize(self):
        self._logger.info('proxy fetcher reinitialization')
        for offset in range(0, self.MAX_PROXIES_COUNT, 64):
            response = self.__static.fetch(
                self.TYPE_GET,
                self.PROXIES_URL,
                {
                    'maxtime': self.DEFAULT_TIMEOUT * 1000,
                    'anon': self.PROXIES_ANON,
                    'start': offset,
                }
            )
            response = BeautifulSoup(response.content, 'lxml')
            table = response.find('table', {'class': 'proxy__t'})
            if table is not None:
                rows = table.tbody.find_all('tr')
                for row in rows:
                    ip = row.find_all('td')[0].string
                    port = row.find_all('td')[1].string
                    self.__proxies.append(f'{ip}:{port}')

        self._logger.info('proxy fetcher reinitialization done successfully')
        self._logger.info(
            f'proxy fetcher available proxies count {len(self.__proxies)}',
        )

    def __proxy(self):
        self.__count += 1
        if self.__count > self.MAX_REQUEST_COUNT:
            self.rotate()
        if self.__index >= len(self.__proxies):
            self.rotate()
        return self.__proxies[self.__index]

    def rotate(self, with_pop=False):
        if with_pop:
            self._logger.info(
                f'proxy fetcher rotation pop proxy {self.__proxies[self.__index]}',
            )
            del self.__proxies[self.__index]
            self._logger.info(
                f'proxy fetcher available proxies count {len(self.__proxies)}',
            )

        while len(self.__proxies) < self.MIN_PROXIES_COUNT:
            self.__initalize()

        self.__index, self.__count = randint(0, len(self.__proxies) - 1), 0
        self._logger.info(
            f'proxy fetcher rotation new proxy {self.__proxies[self.__index]}',
        )

    def fetch(self, htype, query, params={}):
        try_count = 0
        while try_count < self.DEAD_FETCH_TRY_COUNT:
            proxy = self.__proxy()
            self._logger.info(f'''
                proxy start fetching from {query}
                with {str(params)}
                on proxy {proxy}
            ''')
            try_count += 1
            try:
                if htype == self.TYPE_GET:
                    response = self.__session.get(
                        query,
                        params=params,
                        headers=self._headers,
                        proxies={
                            'http': proxy,
                            'https': proxy,
                        },
                        timeout=self.DEFAULT_TIMEOUT,
                    )
                    self._logger.info('proxy fetched successfully')
                    return response
                elif htype == self.TYPE_POST:
                    response = self.__session.post(
                        query,
                        data=params,
                        headers=self._headers,
                        proxies={
                            'http': proxy,
                            'https': proxy,
                        },
                        timeout=self.DEFAULT_TIMEOUT,
                    )
                    self._logger.info('proxy fetched successfully')
                    return response
                else:
                    raise Exception(f'proxy doesn\'t supply htype {htype}')
            except Exception as exception:
                self._logger.error(str(exception))
                self.rotate(True)
        return None
