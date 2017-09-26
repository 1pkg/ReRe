import base

class Option(base.services.Db):
    def __init__(self, connection):
        super().__init__(connection)

    def fetchByRandom(self, limit):
        return self._fetch("""
            SELECT option.id, option.name, category.name as category FROM option
            INNER JOIN category ON option.category_id = category.id
            ORDER BY RANDOM() LIMIT %(limit)s
        """, {'limit': limit,})

    def fetchById(self, id):
        return self._fetch("""
            SELECT option.id, option.name, category.name as category FROM option
            INNER JOIN category ON option.category_id = category.id
            WHERE option.id = %(id)s
            LIMIT 1
        """, {'id': id,})[0]
