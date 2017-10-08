import base
import errors
import constants

class Access(base.Action):
    def __init__(self, application, entry):
        self._entry = entry
        super().__init__(application)

    def _validate(self, request):
        identifier = self._get(request, 'identifier')

        if (identifier == None):
            raise errors.Identifier()

        if (len(identifier) != 32 or (not self.__hex(identifier))):
            raise errors.Identifier()

        entry = self._entry.get(identifier)
        if (entry == None):
            raise errors.Identifier()

        return super()._validate(request)

    def __hex(self, value):
        try:
            int(value, 16)
            return True
        except ValueError:
            return False
