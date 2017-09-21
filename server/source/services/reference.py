import base

class Reference(base.DbService):
    def __init__(self, connection):
        super().__init__(connection)

    def fetchByRandomOptionId(self, optionId, limit):
        return self._fetch("""
            SELECT source, link, message FROM reference
            WHERE option_id = %(option_id)s
            ORDER BY RANDOM() LIMIT  %(limit)s
        """, {'option_id': optionId, 'limit': limit,})
