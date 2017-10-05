import psycopg2.extras

from ..action import *
import errors

class Identification(Action):
    def __init__(self, entry):
        self._entry = entry

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
