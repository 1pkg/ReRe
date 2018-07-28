from random import shuffle
from bs4 import BeautifulSoup, element

from base import Target
from fetchers import Proxy


class AZAnimals(Target):
    MAIN_URL = 'https://www.a-z-animals.com/'

    DEFAULT_LIMIT = None

    def __init__(self, image, wiki, logger, keepers, limit):
        super().__init__(image, wiki, logger, keepers, limit)
        self._fetcher = Proxy(logger)

    def _get_items(self):
        items = []
        query = '{0}{1}/'.format(self.MAIN_URL, 'animals')
        response = self._dead_fetch(query)
        response = BeautifulSoup(response.content, 'lxml')
        anchor = response.find('div', {'class': 'content'})
        for list_item in anchor.find_all('ul'):
            for list_item_anchor in list_item.find_all('a'):
                href = list_item_anchor['href'][1:]
                url = f'{self.MAIN_URL}{href}'
                title = list_item_anchor.string.strip()
                items.append({
                    'url': url,
                    'title': title,
                    'category': 'Animal',
                })
        shuffle(items)
        return items[:self._limit]

    def _from_target(self, url, title):
        response = self._dead_fetch(url)
        response = BeautifulSoup(response.content, 'lxml')
        anchor = response.find('div', {'id': 'jump-article'})
        description = []
        for node in anchor.contents:
            if isinstance(node, element.NavigableString):
                description.append(str(node).strip())
            elif node.name == 'a':
                description.append(node.text.strip())
        description = '\n'.join(description)
        return {
            'name': title,
            'description': description,
            'link': url,
            'source': 'azanimals',
        }
