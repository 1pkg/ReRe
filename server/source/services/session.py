from .db import Db


class Session(Db):
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
        """, {
            'user_host': userHost,
            'user_agent': userAgent,
            'user_ip': userIp,
            'identifier': identifier,
        })
