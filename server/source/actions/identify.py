import hashlib

import base

class Identify(base.Action):
    def __init__(self, application, entry, setting, session):
        self._entry = entry
        self._session = session
        self._setting = setting
        super().__init__(application)

    def _process(self, request):
        identifier = self._get(request, 'identifier')
        if (identifier == None or (self._entry.get(identifier) == None)):
            userHost = self._application.http.userHost(request)
            userAgent = self._application.http.userAgent(request)
            userIp = self._application.http.userIp(request)
            identifier = self.__make(userHost, userAgent, userIp)
            self._session.push(userHost, userAgent, userIp, identifier)
            self._entry.identify(identifier)
        duration = self._setting.fetchByName('timestamp-duration')['value']
        expire = self._setting.fetchByName('session-expire')['value']

        return {
            'identifier': identifier,
            'settings': {
                'timestamp-duration': duration,
                'session-expire': expire,
            },
        }

    def __make(self, userHost, userAgent, userIp):
        hash = hashlib.md5()
        hash.update(userHost.encode('utf-8'))
        hash.update(userAgent.encode('utf-8'))
        hash.update(userIp.encode('utf-8'))
        hash.update(self._application.random.salt().encode('utf-8'))
        return hash.hexdigest()
