from base import Action, Entry
from errors import Request


class Identify(Action):
    def __init__(self, application, identity, setting, session):
        self._identity = identity
        self._setting = setting
        self._session = session
        super().__init__(application)

    def _validate(self, request):
        super()._validate(request)
        self.__userHost = self._application.http.userHost(request)
        self.__userAgent = self._application.http.userAgent(request)
        self.__userIp = self._application.http.userIp(request)

        if (self.__userHost is None):
            raise Request('user_host')

        if (self.__userAgent is None):
            raise Request('user_agent')

        if (self.__userIp is None):
            raise Request('user_ip')

        return True

    def _process(self, request):
        identifier = self._get(request, 'identifier')
        if (self._identity.has(identifier)):
            entry = Entry()
            entry.identify()
            self._identity.set(identifier, entry)
            return {}

        self._application.hash.initialize(
            self._application.datetime.timestamp()
        )
        self._application.hash.update(self.__userHost)
        self._application.hash.update(self.__userAgent)
        self._application.hash.update(self.__userIp)
        identifier = self._application.hash.result()
        self._session.push(
            self.__userHost,
            self.__userAgent,
            self.__userIp,
            identifier
        )
        entry = Entry()
        entry.identify()
        self._identity.set(identifier, entry)

        return {
            'identifier': identifier,
            'settings': {
                'session-expire':
                    self._setting.fetchValueByName('session-expire'),
            },
        }
