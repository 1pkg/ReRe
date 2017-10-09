from .db import *

class Effect(Db):
    def __init__(self, connection):
        super().__init__(connection)

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
            ORDER BY RANDOM()
        """, {'task_id': taskId,})
