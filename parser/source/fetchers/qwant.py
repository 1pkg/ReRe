from os import path as paths, remove

from base import Fetcher
from .image import Image
from .tor import Tor


class Qwant(Fetcher):
    API_URL = 'https://api.qwant.com/api/search/images/'
    API_COUNT = 50

    DEAD_FETCH_TRY_COUNT = 5

    def __init__(self, logger):
        super().__init__(logger)
        self.__tor = Tor(logger)

    def fetch(self, htype, query, params={}):
        uparams = params.copy()
        uparams.update({'q': query, 'count': self.API_COUNT})

        self._logger.info('qwant start refetching')
        try:
            response = self.__tor.fetch(htype, self.API_URL, uparams)
            try_count, response = 0, response.json()
            while response['status'] != 'success' and try_count < self.DEAD_FETCH_TRY_COUNT:
                self.__tor.rotate()
                self._logger.info('qwant start rerefetching')
                response = self.__tor.fetch(htype, self.API_URL, uparams)
                response = response.json()
                try_count += 1
        except Exception as exception:
            self._logger.error(str(exception))
            self.__tor.rotate()
            return []

        if 'data' in response:
            items = response['data']['result']['items']
            self._logger.info(f'qwant fetched successfully count {len(items)}')
            return [item['media'] for item in items]
        return []
