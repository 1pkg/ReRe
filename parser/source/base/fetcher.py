from fake_useragent import UserAgent


class Fetcher:
    TYPE_GET = 'get'
    TYPE_POST = 'post'

    DEFAULT_TIMEOUT = 5.0

    def __init__(self, logger):
        self._logger = logger
        self._agent = UserAgent()
        self._headers = {
            'dnt': '1',  # Do Not Track
            'user-agent': self._agent.random,
        }

    def fetch(self, htype, query, params={}):
        return NotImplemented
