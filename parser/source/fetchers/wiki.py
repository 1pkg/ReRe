from re import sub, IGNORECASE
from warnings import catch_warnings, filterwarnings
from wikipedia import page, search, DisambiguationError
from fuzzywuzzy import fuzz

from base import Fetcher


class Wiki(Fetcher):
    MINIMAL_RATIO = 70
    SEARCH_PAGE_COUNT = 7

    def __init__(self, logger):
        super().__init__(logger)

    def fetch(self, htype, query, params={}):
        search_result = self.__search(query)
        if len(search_result) == 0:
            self._logger.warning('wiki search has no result')
            return None

        choose_result = self.__choose(query, search_result)
        if choose_result is None:
            self._logger.warning('wiki search has no result')
            return None

        try:
            self._logger.info(f'wiki start fetching from {choose_result}')
            with catch_warnings():
                filterwarnings('ignore')
                response = page(choose_result)
            self._logger.info('fetching done successfully')
            return response
        except DisambiguationError as disambiguation:
            return self.__disambiguation(query, disambiguation.options[0])
        except Exception as exception:
            self._logger.error(str(exception))
            return None

    def __search(self, query):
        self._logger.info(f'wiki start searching on {query}')
        result = search(query, self.SEARCH_PAGE_COUNT)
        self._logger.info('searching done successfully')
        return result

    def __choose(self, query, search_result):
        result = []
        simple_query = sub('\s\(.*\)', '', query, flags=IGNORECASE)
        for index, search_page in enumerate(search_result):
            ratio = (
                fuzz.token_sort_ratio(query, search_page) +
                fuzz.token_sort_ratio(simple_query, search_page)
            ) / 2 - index * 5
            self._logger.info(
                f'wiki filter search result {search_page} ratio {ratio}',
            )
            if ratio >= self.MINIMAL_RATIO:
                result.append((search_page, ratio))

        if len(result) > 0:
            result.sort(key=lambda result: result[1], reverse=True)
            return result[0][0]
        return None

    def __disambiguation(self, query, choose_result):
        try:
            ratio = fuzz.token_sort_ratio(query, choose_result)
            self._logger.warning(
                f'wiki fallback search {choose_result} ratio {ratio}',
            )
            if ratio >= self.MINIMAL_RATIO:
                self._logger.info(
                    f'wiki start fetching from {choose_result}',
                )
                with catch_warnings():
                    filterwarnings('ignore')
                    response = page(choose_result)
                self._logger.info('fetching done successfully')
                return response
            return None
        except Exception as exception:
            self._logger.error(str(exception))
            return None
