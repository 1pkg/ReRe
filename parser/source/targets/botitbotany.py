from re import sub
from random import shuffle
from bs4 import BeautifulSoup

from base import Target
from fetchers import Tor


class BotitBotany(Target):
    MAIN_URL = 'http://botit.botany.wisc.edu/courses/systematics/Common-names/index.html'

    DEFAULT_LIMIT = None

    def __init__(self, image, wiki, logger, keepers, limit):
        super().__init__(image, wiki, logger, keepers, limit)
        self._fetcher = Tor(logger)

    def _get_items(self):
        items = []
        response = self._dead_fetch(self.MAIN_URL)
        response = BeautifulSoup(response.content, 'lxml')
        tables = response.find_all('table')
        for table in tables:
            for list_item in table.find_all('a'):
                title = list_item.string.strip()
                title = sub('\(.*?\)', '', title).strip()
                items.append({
                    'url': None,
                    'title': title,
                    'category': 'Plant',
                })
        shuffle(items)
        return items[:self._limit]

    def _from_target(self, url, title):
        return None
