from sys import path as paths
from os import path
paths.append(path.abspath(path.join(__file__, '..', 'tor', 'src')))

import urllib
from TorCrawler import TorCrawler

from base import Fetcher


class Tor(Fetcher):
    def __init__(self, logger, usebs=True):
        super().__init__(logger, usebs)
        self.__tor = TorCrawler(n_requests=100, use_bs=usebs)

    def fetch(self, htype, query, params={}):
        try:
            self._logger.info('''
                tor start fetching from {0}, with tor ip {1}
            '''.format(query, self.__tor.ip))
            if htype == self.TYPE_GET:
                query += '?{0}'.format(urllib.parse.urlencode(params))
                response = self.__tor.get(
                    query,
                    headers=self.headers(),
                )
            elif htype == self.TYPE_POST:
                response = self.__tor.post(
                    query,
                    data=params,
                    headers=self.headers(),
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
