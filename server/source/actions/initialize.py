from .access import *

class Initialize(Access):
    def __init__(self, application, entry, assist):
        self._assist = assist
        super().__init__(application, entry)

    def _process(self, request):
        identifier = self._get(request, 'identifier')
        entry = self._entry.get(identifier)
        entry['timestamp'] = None
        entry['status'] = self._application.STATUS_INITIALIZE
        entry['assists'] = [assist['name'] for assist in self._assist.fetchByRandom(3)]
        entry['task'] = None
        entry['option'] = None
        entry['index'] = None
        entry['effects'] = None
        entry['score'] = 0
        self._entry.set(identifier, entry)

        return {
            'assists': entry['assists'],
        }
