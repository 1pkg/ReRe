import base
import errors

class Access(base.Action):
    def __init__(self, application, entry):
        self._entry = entry
        super().__init__(application)

    def _apply(self, data):
        self._entry.push(self.__identifier)
        return super()._apply(data)

    def _validate(self, request):
        super()._validate(request)
        identifier = self._get(request, 'identifier')

        if (identifier == None):
            raise errors.Identifier()

        if (len(identifier) != 32 or (not self.__hex(identifier))):
            raise errors.Identifier()

        if (self._entry.get(identifier) == None):
            raise errors.Identifier()

        self.__identifier = identifier
        return True

    def __hex(self, value):
        try:
            int(value, 16)
            return True
        except ValueError:
            return False
