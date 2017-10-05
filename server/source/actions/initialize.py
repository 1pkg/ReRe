import base
import errors
import constants

class Initialize(base.actions.Identification):
    def __init__(self, entry, assist):
        self._assist = assist
        super().__init__(entry)

    def _process(self, request):
        identifier = self._get(request, 'identifier')

        assists = self._assist.fetchByRandom(3)
        assists = [assist['name'] for assist in assists]
        self._entry.initialalize(identifier, assists)

        return {
            'assists': assists,
        }
