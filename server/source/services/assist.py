import base

class Assist(base.services.Db):
    def __init__(self, connection):
        super().__init__(connection)

    def fetchByRandom(self, limit):
        return self._fetch("""
            SELECT id, name FROM assist
            ORDER BY RANDOM() LIMIT %(limit)s
        """, {'limit': limit,})
