from base import Action
from errors import Identifier


class Access(Action):
    def __init__(self, application, identity):
        self._identity = identity
        super().__init__(application)

    def _validate(self, request):
        super()._validate(request)
        self._identifier = str(self._get(request, 'identifier'))

        if (not self._application.validator.isHex(self._identifier)):
            raise Identifier()

        if (len(self._identifier) != 128):
            raise Identifier()

        self._entry = self._identity.get(self._identifier)
        if (self._entry is None):
            raise Identifier()

        return True
