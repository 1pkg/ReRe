from fake_useragent import UserAgent


class Fetcher:
    TYPE_GET = 'get'
    TYPE_POST = 'post'
    TYPE_WIKI = 'wiki'

    DEFAULT_TIMEOUT = 5.0

    TEST_URL = 'https://en.wikipedia.org/wiki/Tommy_Wiseau'

    def __init__(self, logger):
        self._logger = logger
        self._agent = UserAgent()

    def headers(self):
        return {
            'dnt': '1',
            'referer': self.TEST_URL,
            'user-agent': self._agent.random,
        }

    def fetch(self, htype, query, params={}):
        return NotImplemented
