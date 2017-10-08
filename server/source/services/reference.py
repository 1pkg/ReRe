from .db import *

class Reference(Db):
    def __init__(self, connection):
        super().__init__(connection)

    def fetchByOptionId(self, optionId, limit):
        return self._fetch("""
            SELECT * FROM reference
            WHERE option_id = %(option_id)s
            ORDER BY RANDOM() LIMIT %(limit)s
        """, {'option_id': optionId, 'limit': limit,})
