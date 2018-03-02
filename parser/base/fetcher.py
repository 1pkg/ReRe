from fake_useragent import UserAgent


class Fetcher:
    TYPE_GET = 'get'
    TYPE_POST = 'post'
    TYPE_WIKI = 'wiki'

    DEFAULT_TIMEOUT = 15.0

    TEST_URL = 'https://en.wikipedia.org/wiki/Tommy_Wiseau'

    def __init__(self, logger, usebs):
        self._logger = logger
        self._usebs = usebs
        self._agent = UserAgent()

    def headers(self):
        return {
            'dnt': '1',
            'x-requested-with': 'XMLHttpRequest',
            'referer': self.TEST_URL,
            'user-agent': self._agent.random,
        }

    def fetch(self, htype, query, params={}):
        return NotImplemented
