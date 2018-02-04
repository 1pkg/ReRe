class Action:
    def __init__(self, application):
        self._application = application

    def __call__(self, request):
        if (self._validate(request)):
            return self._apply(self._process(request))
        return None

    def _validate(self, request):
        return True

    def _process(self, request):
        return NotImplemented

    def _apply(self, data):
        return data

    def _get(self, request, key, default=None):
        if (key in request.args):
            return request.values[key]
        return default
