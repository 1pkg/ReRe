from math import ceil
from re import search, IGNORECASE
from random import shuffle
from bs4 import BeautifulSoup

from base import Target
from fetchers import Tor


class Listal(Target):
    MAIN_URL = 'http://www.listal.com/characters/most-rated/'
    PAGE_SIZE = 45

    DEFAULT_LIMIT = 2100

    def __init__(self, image, wiki, logger, keepers, limit):
        super().__init__(image, wiki, logger, keepers, limit)
        self._fetcher = Tor(logger)

    def _get_items(self):
        items = []
        for page in range(0, ceil(self._limit / self.PAGE_SIZE)):
            query = f'{self.MAIN_URL}{page}'
            response = self._dead_fetch(query)
            response = BeautifulSoup(response.content, 'lxml')
            for list_item in response.find_all('div', {'class': 'gridview'}):
                information = list_item.find('a', {'class': 'image'})
                url = information['href']
                title = information['title'].strip()
                items.append({
                    'url': url,
                    'title': title,
                    'category': 'Fictional Character',
                })
        shuffle(items)
        return items[:self._limit]

    def _from_target(self, url, title):
        response = self._dead_fetch(url)
        response = BeautifulSoup(response.content, 'lxml')
        anchor = response.find('div', {'id': 'rightstuff'})
        anchor = anchor.div.div
        if anchor is not None:
            description = anchor.text
            return {
                'name': title,
                'description': description,
                'link': url,
                'source': 'listal',
            }
        return None

    def _fix_option(self, option):
        if option is None or \
                option['name'] is None or \
                option['name'] is '' or \
                option['description'] is None or \
                option['description'] is '':
            return None

        if option['source'] == 'listal' and \
                search('duplicate', option['description'], IGNORECASE):
            self._logger.warning('target skipping duplicateted')
            return None

        if search('(anime)|(manga)', option['description'], IGNORECASE):
            self._logger.warning('target skipping (anime)|(manga)')
            return None

        if search('game character', option['description'], IGNORECASE):
            self._logger.warning('target skipping game character')
            return None

        return super()._fix_option(option)
