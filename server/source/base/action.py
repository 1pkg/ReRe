class Action:
    def __init__(self, application):
        self._application = application

    def _process(self, request):
        return NotImplemented

    def _validate(self, request):
        return True

    def _get(self, request, key, default = None):
        if (key in request.args):
            return request.values[key]
        return default

    def __call__(self, request):
        if (self._validate(request)):
            return self._application.sequence.purge(
                self._apply(self._process(request)),
                self._excesses()
            )
        return None

    def _apply(self, data):
        return data

    def _excesses(self):
        return ['id', 'description', 'time_stamp']
