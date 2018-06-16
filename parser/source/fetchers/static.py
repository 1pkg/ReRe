from os import environ
from requests import session

from base import Fetcher


class Static(Fetcher):
    def __init__(self, logger):
        super().__init__(logger)
        self.__session = session()
        self.__proxy = environ['PARS_STATIC_PROXY']

    def fetch(self, htype, query, params={}):
        response = None
        self._logger.info(
            f'static start fetching from {query} with {str(params)}',
        )
        while response is None or response.status_code != 200:
            try:
                if htype == self.TYPE_GET:
                    response = self.__session.get(
                        query,
                        params=params,
                        headers=self._headers,
                        proxies={
                            'http': self.__proxy,
                            'https': self.__proxy,
                        },
                        timeout=self.DEFAULT_TIMEOUT,
                    )
                elif htype == self.TYPE_POST:
                    response = self.__session.post(
                        query,
                        data=params,
                        headers=self._headers,
                        proxies={
                            'http': self.__proxy,
                            'https': self.__proxy,
                        },
                        timeout=self.DEFAULT_TIMEOUT,
                    )
                else:
                    raise Exception(f'static doesn\'t supply htype {htype}')
            except Exception as exception:
                self._logger.error(str(exception))
        self._logger.info('static fetched successfully')
        return response
