from .access import *

class Initialize(Access):
    def __init__(self, application, entry, assist):
        self._assist = assist
        super().__init__(application, entry)

    def _process(self, request):
        assists = self._assist.fetchByRandom(3)
        identifier = self._get(request, 'identifier')
        self.__setup(identifier, assists)

        return {
            'assists': self._application.sequence.column(assists, 'name'),
        }

    def __setup(self, identifier, assists):
        entry = self._entry.get(identifier)
        entry['timestamp'] = None
        entry['status'] = self._application.STATUS_INITIALIZE
        entry['assists'] = self._application.sequence.column(assists, 'id')
        entry['task'] = None
        entry['options'] = None
        entry['index'] = None
        entry['effects'] = None
        entry['score'] = 0
        entry['number'] = 0
        self._entry.set(identifier, entry)
