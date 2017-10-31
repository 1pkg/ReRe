from .db import *


class Subject(Db):
    def fetchById(self, id):
        subject = self._fetch("""
            SELECT * FROM subject
            INNER JOIN image ON image.id = subject.object_id AND subject.type = %(type)s
            WHERE subject.id = %(id)s
            LIMIT 1
        """, {'type': 'image', 'id': id, })
        if (len(subject) == 1):
            return subject[0]
        else:
            return None

    def fetchByIds(self, ids):
        return self._fetch("""
            SELECT * FROM subject
            INNER JOIN image ON image.id = subject.object_id AND subject.type = %(type)s
            WHERE subject.id IN (%(ids)s)
        """, {'ids': tuple([id for id in ids]), })

    def fetchRandomOneByOptionId(self, optionId):
        subject = self._fetch("""
            SELECT * FROM subject
            INNER JOIN image ON image.id = subject.object_id AND subject.type = %(type)s
            WHERE option_id = %(option_id)s
            ORDER BY RANDOM() LIMIT 1
        """, {'type': 'image', 'option_id': optionId, })
        if (len(subject) == 1):
            return subject[0]
        else:
            return None
