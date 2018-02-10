from .db import Db


class Option(Db):
    def fetchByRandom(self, limit):
        return self._fetch("""
            SELECT option.* FROM option
            ORDER BY RANDOM() LIMIT %(limit)s
        """, {'limit': limit, })

    def fetchByTaskId(self, taskId):
        return self._fetch("""
            SELECT option.*, task_option.* FROM option
            INNER JOIN task_option ON task_option.option_id = option.id
            WHERE task_option.task_id = %(task_id)s
        """, {'task_id': taskId, })
