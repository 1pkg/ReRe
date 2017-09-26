import base

class Initialize(base.actions.Identification):
    def __init__(self, application, entry, assist):
        self._assist = assist
        super().__init__(application, entry)

    def _process(self, request):
        identifier = self._application.request.getParam(request, 'identifier')
        assists = self._assist.fetchByRandom(3)
        self._entry.initialalize(identifier, assists)

        return {
            'identifier': identifier,
            'assists': assists,
        }
