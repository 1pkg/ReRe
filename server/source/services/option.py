from .db import *

class Option(Db):
    def __init__(self, connection):
        super().__init__(connection)

    def fetchByRandom(self, limit):
        return self._fetch("""
            SELECT option.*, category.name as category FROM option
            INNER JOIN category ON option.category_id = category.id
            ORDER BY RANDOM() LIMIT %(limit)s
        """, {'limit': limit,})

    def fetchByTaskId(self, taskId):
        return self._fetch("""
            SELECT option.*, task_option.*, category.name as category FROM option
            INNER JOIN task_option ON task_option.option_id = option.id
            INNER JOIN category ON option.category_id = category.id
            WHERE task_option.task_id = %(taskId)s
            ORDER BY RANDOM()
        """, {'taskId': taskId,})
