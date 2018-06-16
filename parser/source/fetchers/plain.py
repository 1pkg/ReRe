from requests import session

from base import Fetcher


class Plain(Fetcher):
    def __init__(self, logger):
        super().__init__(logger)
        self.__session = session()

    def fetch(self, htype, query, params={}):
        try:
            self._logger.info(
                f'plain start fetching from {query} with {str(params)}',
            )
            if htype == self.TYPE_GET:
                response = self.__session.get(
                    query,
                    params=params,
                    headers=self._headers,
                    timeout=self.DEFAULT_TIMEOUT,
                )
                self._logger.info('plain fetched successfully')
                return response
            elif htype == self.TYPE_POST:
                response = self.__session.post(
                    query,
                    data=params,
                    headers=self._headers,
                    timeout=self.DEFAULT_TIMEOUT,
                )
                self._logger.info('plain fetched successfully')
                return response
            else:
                raise Exception(f'plain doesn\'t supply htype {htype}')
            self._logger.info('plain fetched successfully')
        except Exception as exception:
            self._logger.error(str(exception))
            return None
