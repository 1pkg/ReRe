from .db import *


class Setting(Db):
    def fetchById(self, id):
        task = self._fetch("""
            SELECT * FROM setting
            WHERE id = %(id)s
            LIMIT 1
        """, {'id': id, })
        if (len(task) == 1):
            return task[0]
        else:
            return None

    def fetchByIds(self, ids):
        return self._fetch("""
            SELECT * FROM setting
            WHERE id IN (%(ids)s)
        """, {'ids': tuple([id for id in ids]), })

    def fetchByName(self, name):
        setting = self._fetch("""
            SELECT * FROM setting
            WHERE name = %(name)s
            LIMIT 1
        """, {'name': name, })
        if (len(setting) == 1):
            return setting[0]
        else:
            return None
