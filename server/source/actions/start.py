import base

class Start(base.Action):
    def __init__(self, application, entry):
        self._entry = entry
        super().__init__(application)

    def _process(self, request):
        identifier = self._application.request.getParam(request, 'identifier')
        if (identifier == None):
            identifier = self._application.crypto.getClientIdentifier(
                'salt',
                self._application.request.getClientHost(request),
                self._application.request.getClientUserAgent(request),
                self._application.request.getClientIp(request)
            )
            self._entry.start(identifier)

        return {
            'identifier': identifier,
        }
