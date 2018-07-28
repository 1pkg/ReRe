from string import ascii_uppercase
from random import shuffle
from bs4 import BeautifulSoup

from base import Target
from fetchers import Tor


class ReligionWikia(Target):
    MAIN_URL = 'http://religion.wikia.com/wiki/List_of_legendary_creatures'

    DEFAULT_LIMIT = None

    def __init__(self, image, wiki, logger, keepers, limit):
        super().__init__(image, wiki, logger, keepers, limit)
        self._fetcher = Tor(logger)

    def _get_items(self):
        items = []
        for page in ascii_uppercase:
            query = f'{self.MAIN_URL}_({page})'
            response = self._dead_fetch(query)
            response = BeautifulSoup(response.content, 'lxml')
            content_list = response.find('div', {'id': 'mw-content-text'})
            for list_item in content_list.find_all('li'):
                title = list_item.contents[0].split(' (')[0].strip()
                items.append({
                    'url': None,
                    'title': title,
                    'category': 'Mythical Creature',
                })
        shuffle(items)
        return items[:self._limit]

    def _from_target(self, url, title):
        return None
