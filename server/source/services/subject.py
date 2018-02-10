from .db import Db


class Subject(Db):
    def fetchById(self, id):
        subject = self._fetch("""
            SELECT * FROM subject
            WHERE id = %(id)s
            LIMIT 1
        """, {'id': id, })
        if (len(subject) == 1):
            return subject[0]
        else:
            return None

    def fetchByTaskId(self, taskId):
        subject = self._fetch("""
            SELECT subject.* FROM subject
            INNER JOIN task ON task.subject_id = subject.id
            WHERE task.id = %(task_id)s
        """, {'task_id': taskId, })
        if (len(subject) == 1):
            return subject[0]
        else:
            return None

    def fetchRandomOneByOptionId(self, optionId):
        subject = self._fetch("""
            SELECT * FROM subject
            WHERE option_id = %(option_id)s
            ORDER BY RANDOM() LIMIT 1
        """, {'option_id': optionId, })
        if (len(subject) == 1):
            return subject[0]
        else:
            return None
