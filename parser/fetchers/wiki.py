import re
import wikipedia
from fuzzywuzzy import fuzz

from base import Fetcher


class Wiki(Fetcher):
    def __init__(self, logger):
        super().__init__(logger, False)

    def fetch(self, htype, query, params={}):
        if htype != self.TYPE_WIKI:
            self._logger.error('''
                wiki doesn\'t supply htype {0}
            '''.format(htype))
            return None

        searchResult = self.__search(query)
        if len(searchResult) == 0:
            self._logger.warning('''
                wiki search has no result
            ''')
            return None

        chooseResult = self.__choose(query, searchResult)
        if chooseResult is None:
            self._logger.warning('''
                wiki search has no result
            ''')
            return None

        try:
            self._logger.info('''
                wiki start fetching from {0}
            '''.format(chooseResult))
            response = wikipedia.page(chooseResult)
            self._logger.info('''
                fetching done successfully
            ''')
            response.filter_images = self.__filterImage(query, response)
            return response
        except Exception as exception:
            self._logger.error(str(exception))
            return None

    def __search(self, query):
        self._logger.info('''
            wiki start searching on {0}
        '''.format(query))
        searchResult = wikipedia.search(query)
        self._logger.info('''
            searching done successfully
        ''')
        return searchResult

    def __choose(self, query, searchResult):
        chooseResult = None
        smallQuery = re.sub('\s\(.*\)', '', query)
        for pageName in searchResult:
            ratioFull = fuzz.token_sort_ratio(query, pageName)
            ratioSmall = fuzz.token_sort_ratio(smallQuery, pageName)
            self._logger.info('''
                wiki filter search result {0} ratio {1}
            '''.format(pageName, ratioFull + ratioSmall))
            if (ratioFull + ratioSmall >= 130):
                chooseResult = pageName
                break
        return chooseResult

    def __filterImage(self, query, response):
        images = []
        smallQuery = re.sub('\s\(.*\)', '', query)
        for image in response.images:
            imagePart = image.rsplit('/', 1)[-1]
            ratioFull = fuzz.token_sort_ratio(query, imagePart)
            ratioSmall = fuzz.token_sort_ratio(smallQuery, imagePart)
            self._logger.info('''
                wiki filter images {0} ratio {1}
            '''.format(image, ratioFull + ratioSmall))
            if (ratioFull + ratioSmall >= 100):
                images.append(image)
        return images
