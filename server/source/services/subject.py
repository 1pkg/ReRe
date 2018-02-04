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
