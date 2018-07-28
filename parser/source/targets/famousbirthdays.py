from re import sub, search, DOTALL, IGNORECASE, UNICODE
from random import shuffle
from bs4 import BeautifulSoup

from base import Target
from fetchers import Proxy


class FamousBirthdays(Target):
    MAIN_URL = 'https://www.famousbirthdays.com/'
    PERSONS_SLICE = 11
    MONTH_DAY_MAP = {
        'january':      31,
        'february':     29,
        'march':        31,
        'april':        30,
        'may':          31,
        'june':         30,
        'july':         31,
        'august':       31,
        'september':    30,
        'october':      31,
        'november':     30,
        'december':     31,
    }

    DEFAULT_LIMIT = None

    MIN_RANK = 20000

    def __init__(self, image, wiki, logger, keepers, limit):
        super().__init__(image, wiki, logger, keepers, limit)
        self._fetcher = Proxy(logger)

    def _get_items(self):
        items = []
        for month, days in self.MONTH_DAY_MAP.items():
            for day in range(1, days):
                query = f'{self.MAIN_URL}{month}{day}.html'
                response = self._dead_fetch(query)
                response = BeautifulSoup(response.content, 'lxml')
                persons = response.find_all('a', {'class': 'person-item'})
                for list_item in persons[:self.PERSONS_SLICE]:
                    url = list_item['href']
                    title = list_item.div.div.string
                    if ',' in title:
                        title = title.split(',')[0].strip()
                    else:
                        title = sub(
                            '(.*) \(.*\)',
                            '\\1',
                            title,
                            flags=DOTALL | IGNORECASE | UNICODE,
                        ).strip()
                    subtitle = list_item.find('div', {'class': 'hidden-xs'})
                    if subtitle is not None:
                        subtitle = subtitle.string.strip()
                        title = f'{title} ({subtitle})'
                    items.append({
                        'url': url,
                        'title': title,
                        'category': 'Person',
                    })
        shuffle(items)
        return items[:self._limit]

    def _from_target(self, url, title):
        response = self._dead_fetch(url)
        response = BeautifulSoup(response.content, 'lxml')
        rank = response.find('div', {'class': 'rank-no'})
        if rank is None or int(rank.text[1:]) > self.MIN_RANK:
            self._logger.warning(
                f'target option rank too small {int(rank.text[1:])}',
            )
            return None
        bio = response.find('div', {'class': 'bio'})
        description = bio.text
        return {
            'name': title,
            'description': description,
            'link': url,
            'source': 'famousbirthdays',
        }

    def _fix_option(self, option):
        if option is None or \
                option['name'] is None or \
                option['name'] is '' or \
                option['description'] is None or \
                option['description'] is '':
            return None

        if search('musical\.ly', option['name'], IGNORECASE):
            self._logger.warning('target skipping musical.ly')
            return None

        if option['source'] == 'famousbirthdays':
            option['description'] = sub(
                '^About\s',
                '',
                option['description'],
            )

        return super()._fix_option(option)
