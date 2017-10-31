from .db import *


class Assist(Db):
    def fetchById(self, id):
        assist = self._fetch("""
            SELECT * FROM assist
            WHERE id = %(id)s
            LIMIT 1
        """, {'id': id, })
        if (len(assist) == 1):
            return assist[0]
        else:
            return None

    def fetchByIds(self, ids):
        return self._fetch("""
            SELECT * FROM assist
            WHERE id IN %(ids)s
        """, {'ids': tuple([id for id in ids]), })

    def fetchByRandom(self, limit):
        return self._fetch("""
            SELECT * FROM assist
            ORDER BY RANDOM() LIMIT %(limit)s
        """, {'limit': limit, })
