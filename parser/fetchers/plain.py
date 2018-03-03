import requests
from bs4 import BeautifulSoup

from base import Fetcher


class Plain(Fetcher):
    def __init__(self, logger, usebs=True):
        super().__init__(logger, usebs)

    def fetch(self, htype, query, params={}):
        self._logger.info('''
                plain start fetching from {0} with {1}
            '''.format(query, str(params)))
        if htype == self.TYPE_GET:
            response = requests.get(
                query,
                params=params,
                headers=self.headers(),
                timeout=self.DEFAULT_TIMEOUT,
            )
        elif htype == self.TYPE_POST:
            response = requests.post(
                query,
                data=params,
                headers=self.headers(),
                timeout=self.DEFAULT_TIMEOUT,
            )
        else:
            self._logger.error('''
                    plain doesn\'t supply htype {0}
                '''.format(htype))
            return None
        self._logger.info('plain fetched successfully')

        if self._usebs:
            return BeautifulSoup(response.content, 'html.parser')
        else:
            return response
