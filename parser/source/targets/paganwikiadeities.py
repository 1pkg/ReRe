from random import shuffle
from bs4 import BeautifulSoup

from base import Target
from fetchers import Tor


class PaganWikiaDeities(Target):
    MAIN_URL = 'http://pagan.wikia.com/wiki/List_of_Deities'

    DEFAULT_LIMIT = None

    def __init__(self, image, wiki, logger, keepers, limit):
        super().__init__(image, wiki, logger, keepers, limit)
        self._fetcher = Tor(logger)

    def _get_items(self):
        items = []
        response = self._dead_fetch(self.MAIN_URL)
        response = BeautifulSoup(response.content, 'lxml')
        article = response.find('div', {'id': 'WikiaArticle'})
        for list_item in article.find_all('li'):
            anchors = list_item.find_all('a')
            if not len(anchors) == 0:
                title = anchors[0].string.strip()
                items.append({
                    'url': None,
                    'title': title,
                    'category': 'Deity',
                })
        shuffle(items)
        return items[:self._limit]

    def _from_target(self, url, title):
        return None
