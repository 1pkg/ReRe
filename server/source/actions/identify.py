import hashlib

import base

class Identify(base.Action):
    def __init__(self, application, entry):
        self._entry = entry
        super().__init__(application)

    def _process(self, request):
        identifier = self._get(request, 'identifier')
        if (identifier == None or (self._entry.get(identifier) == None)):
            identifier = self.__getClientIdentifier(request)
        self._entry.identify(identifier)

        return {
            'identifier': identifier,
        }

    def __getClientIdentifier(self, request):
        hash = hashlib.md5()
        hash.update(self._application.http.clientHost(request).encode('utf-8'))
        hash.update(self._application.http.clientUserAgent(request).encode('utf-8'))
        hash.update(self._application.http.clientIp(request).encode('utf-8'))
        hash.update(self._application.random.salt().encode('utf-8'))
        return hash.hexdigest()
