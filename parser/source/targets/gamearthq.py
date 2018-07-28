from re import sub, DOTALL, IGNORECASE, UNICODE
from string import ascii_lowercase
from random import shuffle
from bs4 import BeautifulSoup, element

from base import Target
from fetchers import Tor


class GameArtHq(Target):
    MAIN_URL = 'http://www.game-art-hq.com/'
    PAGINATION_PART = 'video-game-characters-on-game-art-hq-'
    PAGINATION_EXCEPTION = 'the-video-game-character-database-letter-a/'

    DEFAULT_LIMIT = 700

    def __init__(self, image, wiki, logger, keepers, limit):
        super().__init__(image, wiki, logger, keepers, limit)
        self._fetcher = Tor(logger)

    def _get_items(self):
        items = []
        for page in ascii_lowercase:
            if page == 'a':
                query = f'{self.MAIN_URL}{self.PAGINATION_EXCEPTION}'
            else:
                query = f'{self.MAIN_URL}{self.PAGINATION_PART}{page}/'
            response = self._dead_fetch(query)
            response = BeautifulSoup(response.content, 'lxml')
            entry = response.find('div', {'class': 'entry'})
            for list_item in entry.find_all('td'):
                anchor = list_item.find('a')
                title = list_item.find('strong')
                if anchor is not None and title is not None:
                    url = anchor['href']
                    title = title.text.strip()
                    items.append({
                        'url': url,
                        'title': title,
                        'category': 'Game Character',
                    })
        shuffle(items)
        return items[:self._limit]

    def _from_target(self, url, title):
        response = self._dead_fetch(url)
        response = BeautifulSoup(response.content, 'lxml')
        title = response.find('h2', {'class': 'post-title'})
        if title is None:
            title = response.find('h2', {'class': 'page-title'})
        title = title.string
        entry = response.find('div', {'class': 'entry'})
        for node in entry.contents:
            if not isinstance(node, element.NavigableString) and len(node.text):
                description = node.text
                break
        return {
            'name': title,
            'description': description,
            'link': url,
            'source': 'gamearthq',
        }

    def _fix_option(self, option):
        if option is None or \
                option['name'] is None or \
                option['name'] is '' or \
                option['description'] is None or \
                option['description'] is '':
            return None

        if option['source'] == 'gamearthq':
            option['name'] = sub(
                '(.*)\sfrom\s(?:the\s)?(.*?)\sin.*',
                '\\1 (\\2)',
                option['name'],
                flags=DOTALL | IGNORECASE | UNICODE,
            )
            option['name'] = sub(
                '(.*)\sfrom\s(?:the\s)?(.*?)\s?[,\u2013].*',
                '\\1 (\\2)',
                option['name'],
                flags=DOTALL | IGNORECASE | UNICODE,
            )
            option['name'] = sub(
                '(.*)\sfrom\s(.*)',
                '\\1 (\\2)',
                option['name'],
                flags=DOTALL | IGNORECASE | UNICODE,
            )
            option['name'] = sub(
                ' ?[oi]n (the)? ((game)|(ga))(-art)?-hq',
                '',
                option['name'],
                flags=IGNORECASE,
            )
            option['name'] = sub(
                'video game character db',
                '',
                option['name'],
                flags=IGNORECASE,
            )
            option['name'] = sub(
                'fan art (gallery)?',
                '',
                option['name'],
                flags=IGNORECASE,
            )
            option['name'] = sub(
                'official artworks?',
                '',
                option['name'],
                flags=IGNORECASE,
            )
            if '(' not in option['name']:
                name = option['name']
                option['name'] = f'{name.strip()} (Game Character)'

        return super()._fix_option(option)
