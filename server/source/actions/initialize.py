import errors
import constants
from .access import *

class Initialize(Access):
    def __init__(self, application, entry, assist):
        self._assist = assist
        super().__init__(application, entry)

    def _process(self, request):
        identifier = self._get(request, 'identifier')

        assists = self._assist.fetchByRandom(3)
        assists = [assist['name'] for assist in assists]
        self._entry.initialalize(identifier, assists)

        return {
            'assists': assists,
        }
