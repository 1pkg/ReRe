from .db import *

class Effect(Db):
    def __init__(self, connection):
        super().__init__(connection)

    def fetchByRandom(self, limit):
        return self._fetch("""
            SELECT * FROM effect
            ORDER BY RANDOM() LIMIT %(limit)s
        """, {'limit': limit,})
