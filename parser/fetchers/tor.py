from sys import path as paths
from os import path
paths.append(path.abspath(path.join(__file__, '..', 'tor', 'src')))

from TorCrawler import TorCrawler
from fake_useragent import UserAgent

from base import Fetcher


class Tor(Fetcher):
    def __init__(self, logger):
        super().__init__(logger)
        self.__agent = UserAgent()
        self.__tor = TorCrawler(n_requests=100)

    def fetch(self, query):
        self._logger.info('tor fetch: {0}, with ip {1}'.format(query, self.__tor.ip))
        headers = {'user-agent': self.__agent.random, }
        return self.__tor.get(query, headers=headers)
