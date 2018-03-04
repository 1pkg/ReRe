from sys import path as paths
from os import path
paths.append(path.abspath(path.join(__file__, '..', 'tor', 'src')))

import urllib
from TorCrawler import TorCrawler

from base import Fetcher


class Tor(Fetcher):
    MAX_REQUEST_COUNT = 100
    __instance = None

    def __init__(self, logger):
        super().__init__(logger)
        self.__tor = TorCrawler(
            n_requests=self.MAX_REQUEST_COUNT,
            use_bs=False,
        )

    def rotate(self):
        self.__tor.rotate()

    def fetch(self, htype, query, params={}):
        try:
            self._logger.info('''
                tor start fetching from {0}, with {1}, on ip {2}
            '''.format(query, str(params), self.__tor.ip))
            if htype == self.TYPE_GET:
                query += '?{0}'.format(urllib.parse.urlencode(params))
                response = self.__tor.get(
                    query,
                    headers=self.headers(),
                    timeout=self.DEFAULT_TIMEOUT * 3.0,
                )
            elif htype == self.TYPE_POST:
                response = self.__tor.post(
                    query,
                    data=params,
                    headers=self.headers(),
                    timeout=self.DEFAULT_TIMEOUT * 3.0,
                )
            else:
                raise Exception('''
                    tor doesn\'t supply htype {0}
                '''.format(htype))
            self._logger.info('''
                fetching done successfully
            ''')
            return response
        except Exception as exception:
            self._logger.error(str(exception))
            return None
