class Action:
    def __call__(self, request):
        if (self._validate(request)):
            return self._process(request)
        return None

    def _process(self, request):
        return NotImplemented

    def _validate(self, request):
        return True

    def _get(self, request, key, default = None):
        if (key in request.args):
            return request.values[key]
        return default
