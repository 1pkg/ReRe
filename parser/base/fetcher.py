class Fetcher:
    def __init__(self, logger):
        self._logger = logger

    def fetch(self, query):
        return NotImplemented
