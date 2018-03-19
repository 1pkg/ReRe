import requests

from base import Fetcher


class Plain(Fetcher):
    def __init__(self, logger):
        super().__init__(logger)
        self.__session = requests.session()

    def fetch(self, htype, query, params={}):
        try:
            self._logger.info('''
                plain start fetching from {0} with {1}
            '''.format(query, str(params)))
            if htype == self.TYPE_GET:
                response = self.__session.get(
                    query,
                    params=params,
                    headers=self.headers(),
                    timeout=self.DEFAULT_TIMEOUT,
                )
                self._logger.info('''
                    plain fetched successfully
                ''')
                return response
            elif htype == self.TYPE_POST:
                response = self.__session.post(
                    query,
                    data=params,
                    headers=self.headers(),
                    timeout=self.DEFAULT_TIMEOUT,
                )
                self._logger.info('''
                    plain fetched successfully
                ''')
                return response
            else:
                raise Exception('''
                    plain doesn\'t supply htype {0}
                '''.format(htype))
            self._logger.info('plain fetched successfully')
        except Exception as exception:
            self._logger.error(str(exception))
            return None
