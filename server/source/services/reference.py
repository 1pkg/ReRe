from .db import *

class Reference(Db):
    def fetchById(self, id):
        reference = self._fetch("""
            SELECT * FROM reference
            WHERE id = %(id)s
            LIMIT 1
        """, {'id': id,})
        if (len(reference) == 1):
            return reference[0]
        else:
            return None

    def fetchByIds(self, ids):
        return self._fetch("""
            SELECT * FROM reference
            WHERE id IN (%(ids)s)
        """, {'ids': ','.join([str(id) for id in ids]),})

    def fetchRandomOneByOptionId(self, optionId):
        reference = self._fetch("""
            SELECT * FROM reference
            WHERE option_id = %(option_id)s
            ORDER BY RANDOM() LIMIT 1
        """, {'option_id': optionId,})
        if (len(reference) == 1):
            return reference[0]
        else:
            return None
