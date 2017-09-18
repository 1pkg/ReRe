import base

class Subject(base.SqlProvider):
    def __init__(self, connection):
        super().__init__(connection)

    def fetchByOptionId(self, optionId):
        return self._fetch("""
            SELECT subject.id, image.source_link as sourceLink, image.source_alt as sourceAlt FROM subject
            INNER JOIN image ON image.id = subject.object_id AND subject.type = %(type)s
            WHERE option_id = %(option_id)s LIMIT 1
        """, {'type': 'image', 'option_id': optionId,})
