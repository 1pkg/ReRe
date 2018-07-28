from re import search, MULTILINE, IGNORECASE
from os import path as paths, remove

from base import Fetcher
from .image import Image
from .tor import Tor


class DuckDuckGo(Fetcher):
    API_URL = 'https://duckduckgo.com/'

    def __init__(self, logger):
        super().__init__(logger)
        self.__tor = Tor(logger)

    def fetch(self, htype, query, params={}):
        self._logger.info('duckduckgo start extracting vqd')
        response = self.__tor.fetch(
            self.__tor.TYPE_POST,
            self.API_URL,
            {'q': query},
        )
        if response is None:
            self._logger.warning('duckduckgo vqd not found')
            return []

        vqd = search(
            'vqd=(\d+)',
            str(response.content),
            flags=MULTILINE | IGNORECASE,
        )
        if vqd is None:
            self._logger.warning('duckduckgo vqd not found')
            return []

        vqd = vqd.group(1)
        self._logger.info(f'duckduckgo vqd extracted successfully {vqd}')
        uparam = params.copy()
        uparam.update({'q': query, 'o': 'json', 'vqd': vqd})

        try:
            self._logger.info('duckduckgo start refetching')
            response = self.__tor.fetch(htype, f'{self.API_URL}i.js', uparam)
            response = response.json()
        except Exception as exception:
            self._logger.error(str(exception))
            self.__tor.rotate()
            return []

        items = response['results']
        self._logger.info(
            f'duckduckgo fetched successfully count {len(items)}',
        )
        return [item['image'] for item in items]
