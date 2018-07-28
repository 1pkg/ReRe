from bs4 import BeautifulSoup
from random import shuffle

from base import Target
from fetchers import Tor


class KapsenbergDesignGarden(Target):
    MAIN_URL = 'http://www.kapsenbergdesign.com/garden/byid.php'

    DEFAULT_LIMIT = None

    def __init__(self, image, wiki, logger, keepers, limit):
        super().__init__(image, wiki, logger, keepers, limit)
        self._fetcher = Tor(logger)

    def _get_items(self):
        items = []
        response = self._dead_fetch(self.MAIN_URL)
        response = BeautifulSoup(response.content, 'lxml')
        for list_item in response.find_all('tr', {'class': 'list'}):
            inner = list_item.find_all('td')
            title = inner[2].string.strip()
            items.append({
                'url': None,
                'title': title,
                'category': 'Plant',
            })
        shuffle(items)
        return items[:self._limit]

    def _from_target(self, url, title):
        return None
