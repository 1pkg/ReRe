from .db import *

class Effect(Db):
    def __init__(self, connection):
        super().__init__(connection)

    def fetchById(self, id):
        effect = self._fetch("""
            SELECT * FROM effect
            WHERE id = %(id)s
            LIMIT 1
        """, {'id': id,})
        if (len(effect) == 1):
            return effect[0]
        else:
            return None

    def fetchByIds(self, ids):
        return self._fetch("""
            SELECT * FROM effect
            WHERE id IN (%(ids)s)
        """, {'ids': ','.join([str(id) for id in ids]),})

    def fetchByRandom(self, limit):
        return self._fetch("""
            SELECT * FROM effect
            ORDER BY RANDOM() LIMIT %(limit)s
        """, {'limit': limit,})

    def fetchByTaskId(self, taskId):
        return self._fetch("""
            SELECT * FROM effect
            INNER JOIN task_effect ON task_effect.effect_id = effect.id
            WHERE task_effect.task_id = %(task_id)s
        """, {'task_id': taskId,})
