class Action:
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
        if (request.json is not None and key in request.json):
            return str(request.json[key])
        return default
