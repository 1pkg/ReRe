class Action:
    CONNECTION_LIMIT = '100 per minute'

    def __init__(self, application):
        self._application = application

    def __call__(self, request):
        self._validate(request)
        return self._process(request)

    def _validate(self, request):
        pass

    def _process(self, request):
        return NotImplemented

    def _get(self, request, key, default=None):
        if (key in request.args):
            return request.values[key]
        return default
