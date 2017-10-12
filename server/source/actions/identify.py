import hashlib

import base

class Identify(base.Action):
    def __init__(self, application, entry, session):
        self._entry = entry
        self._session = session
        super().__init__(application)

    def _process(self, request):
        identifier = self._get(request, 'identifier')
        if (identifier == None or (self._entry.get(identifier) == None)):
            host = self._application.http.clientHost(request)
            userAgent = self._application.http.clientUserAgent(request)
            ip = self._application.http.clientIp(request)
            identifier = self.__make(host, userAgent, ip)
            self._session.push(host, userAgent, ip, identifier)
            self._entry.identify(identifier)

        return {
            'identifier': identifier,
        }

    def __make(self, host, userAgent, ip):
        hash = hashlib.md5()
        hash.update(host.encode('utf-8'))
        hash.update(userAgent.encode('utf-8'))
        hash.update(ip.encode('utf-8'))
        hash.update(self._application.random.salt().encode('utf-8'))
        return hash.hexdigest()
