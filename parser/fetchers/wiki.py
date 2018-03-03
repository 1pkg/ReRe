import re
import wikipedia
from fuzzywuzzy import fuzz

from base import Fetcher


class Wiki(Fetcher):
    MINIMAL_RATIO = 75
    SEARCH_PAGE_COUNT = 5

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
            return response
        except Exception as exception:
            self._logger.error(str(exception))
            return None

    def __search(self, query):
        self._logger.info('''
            wiki start searching on {0}
        '''.format(query))
        searchResult = wikipedia.search(
            query,
            self.SEARCH_PAGE_COUNT
        )
        self._logger.info('''
            searching done successfully
        ''')
        return searchResult

    def __choose(self, query, searchResult):
        chooseResult = None
        simpleQuery = re.sub('\s\(.*\)', '', query)
        for index in range(0, len(searchResult)):
            searchPage = searchResult[index]
            ratio = (
                fuzz.token_sort_ratio(query, searchPage) +
                fuzz.token_sort_ratio(simpleQuery, searchPage)
            ) / 2 - index * 5
            self._logger.info('''
                wiki filter search result {0} ratio {1}
            '''.format(searchPage, ratio))
            if ratio >= self.MINIMAL_RATIO:
                chooseResult = searchPage
                break
        return chooseResult
