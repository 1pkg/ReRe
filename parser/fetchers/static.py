import os
import requests

from base import Fetcher


class Static(Fetcher):
    def __init__(self, logger):
        super().__init__(logger)
        self.__session = requests.session()
        self.__proxy = os.environ['STATIC_PROXY']

    def fetch(self, htype, query, params={}):
        self._logger.info('''
            static start fetching from {0}, with {1}
        '''.format(query, str(params)))

        response = None
        while response is None or response.status_code != 200:
            try:
                if htype == self.TYPE_GET:
                    response = self.__session.get(
                        query,
                        params=params,
                        headers=self.headers(),
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
                        headers=self.headers(),
                        proxies={
                            'http': self.__proxy,
                            'https': self.__proxy,
                        },
                        timeout=self.DEFAULT_TIMEOUT,
                    )
                else:
                    self._logger.error('''
                        static doesn\'t supply htype {0}
                    '''.format(htype))
                    return None
            except Exception as exception:
                self._logger.error(str(exception))

        self._logger.info('''
            static fetched successfully
        ''')
        return response
