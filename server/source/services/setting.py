from .db import Db


class Setting(Db):
    def fetchValueByName(self, name):
        setting = self._fetch("""
            SELECT * FROM setting
            WHERE name = %(name)s
            LIMIT 1
        """, {'name': name, })
        if (len(setting) == 1):
            return setting[0]['value']
        else:
            return None
