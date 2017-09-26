import psycopg2.extras

from ..action import *
from ..errors.identifier import *

class Identification(Action):
    def __init__(self, application, entry):
        self._entry = entry
        super().__init__(application)

    def _validate(self, request):
        identifier = self._application.request.getParam(request, 'identifier')
        if (identifier == None):
            raise Identifier()

        entry = self._entry.get(identifier)
        if (entry == None):
            raise Identifier()

        return super()._validate(request)
