from .db import *


class Session(Db):
    def fetchById(self, id):
        session = self._fetch("""
            SELECT * FROM session
            WHERE id = %(id)s
            LIMIT 1
        """, {'id': id, })
        if (len(session) == 1):
            return session[0]
        else:
            return None

    def fetchByIds(self, ids):
        return self._fetch("""
            SELECT * FROM session
            WHERE id IN (%(ids)s)
        """, {'ids': tuple([id for id in ids]), })

    def fetchByIdentifier(self, identifier):
        session = self._fetch("""
            SELECT * FROM session
            WHERE identifier = %(identifier)s
            LIMIT 1
        """, {'identifier': identifier, })
        if (len(session) == 1):
            return session[0]
        else:
            return None

    def push(self, userHost, userAgent, userIp, identifier):
        self._execute("""
            INSERT INTO session (user_host, user_agent, user_ip, identifier)
            VALUES (%(user_host)s, %(user_agent)s, %(user_ip)s, %(identifier)s)
        """, {'user_host': userHost, 'user_agent': userAgent, 'user_ip': userIp, 'identifier': identifier, })
