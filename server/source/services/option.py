from .db import *

class Option(Db):
    def fetchById(self, id):
        option = self._fetch("""
            SELECT * FROM option
            WHERE id = %(id)s
            LIMIT 1
        """, {'id': id,})
        if (len(option) == 1):
            return option[0]
        else:
            return None

    def fetchByIds(self, ids):
        return self._fetch("""
            SELECT * FROM option
            WHERE id IN (%(ids)s)
        """, {'ids': ','.join([str(id) for id in ids]),})

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
            WHERE task_option.task_id = %(task_id)s
        """, {'task_id': taskId,})
