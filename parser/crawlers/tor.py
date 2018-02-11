import sys
import os
sys.path.append(os.path.abspath(os.path.join(__file__, '..', 'tor', 'src')))

from TorCrawler import TorCrawler
from fake_useragent import UserAgent

userAgent = UserAgent()
crawler = TorCrawler(n_requests=50)


class Tor:
    @staticmethod
    def fetch(url):
        print("Tor Fetch {0} ip {1}".format(url, crawler.ip))
        return crawler.get(url, headers={'user-agent': userAgent.random, })
