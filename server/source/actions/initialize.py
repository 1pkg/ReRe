import base

class Initialize(base.actions.Identification):
    def __init__(self, application, entry, assist):
        self._assist = assist
        super().__init__(application, entry)

    def _process(self, request):
        assists = self._assist.fetchByRandom(3)
        assists = [assist['name'] for assist in assists]
        identifier = self._application.request.getParam(request, 'identifier')
        self._entry.initialalize(identifier, assists)

        return {
            'assists': assists,
        }
