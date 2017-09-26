class Action:
    def __init__(self, application):
        self._application = application

    def __call__(self, request):
        if (self._validate(request)):
            return self._process(request)
        return None

    def _process(self, request):
        return NotImplemented

    def _validate(self, request):
        return True
