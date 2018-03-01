import wikipedia

from base import Fetcher


class Wiki(Fetcher):
    def fetch(self, query):
        self._logger.info('wiki search: {0}'.format(query))
        search = wikipedia.search(query)
        if len(search) == 0:
            self._logger.warning('wiki search has no result')
            return None
        try:
            self._logger.info('wiki fetch: {0}'.format(search[0]))
            return wikipedia.page(search[0])
        except wikipedia.exceptions.DisambiguationError as exception:
            search = exception.options[0]
            self._logger.warning('wiki fetch with fallback: {0}'.format(search))
            return wikipedia.page(search)
