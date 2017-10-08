from .db import *

class Subject(Db):
    def __init__(self, connection):
        super().__init__(connection)

    def fetchById(self, id):
        return self._fetch("""
            SELECT * FROM subject
            INNER JOIN image ON image.id = subject.object_id AND subject.type = %(type)s
            WHERE subject.id = %(id)s
            LIMIT 1
        """, {'type': 'image', 'id': id,})[0]

    def fetchByOptionId(self, optionId):
        return self._fetch("""
            SELECT * FROM subject
            INNER JOIN image ON image.id = subject.object_id AND subject.type = %(type)s
            WHERE option_id = %(option_id)s
            ORDER BY RANDOM() LIMIT 1
        """, {'type': 'image', 'option_id': optionId,})[0]
