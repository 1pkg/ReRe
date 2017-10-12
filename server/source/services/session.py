from .db import *

class Session(Db):
    def fetchById(self, id):
        session = self._fetch("""
            SELECT * FROM session
            WHERE id = %(id)s
            LIMIT 1
        """, {'id': id,})
        if (len(session) == 1):
            return session[0]
        else:
            return None

    def fetchByIds(self, ids):
        return self._fetch("""
            SELECT * FROM session
            WHERE id IN (%(ids)s)
        """, {'ids': ','.join([str(id) for id in ids]),})

    def fetchByIdentifier(self, identifier):
        session = self._fetch("""
            SELECT * FROM session
            WHERE identifier = %(identifier)s
            LIMIT 1
        """, {'identifier': identifier,})
        if (len(session) == 1):
            return session[0]
        else:
            return None

    def push(self, host, userAgent, ip, identifier):
        self._execute("""
            INSERT INTO session (host, user_agent, ip, identifier)
            VALUES (%(host)s, %(user_agent)s, %(ip)s, %(identifier)s)
        """, {'host': host, 'user_agent': userAgent, 'ip': ip, 'identifier': identifier,})
