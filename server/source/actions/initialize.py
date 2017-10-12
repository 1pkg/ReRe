from .access import *

class Initialize(Access):
    def __init__(self, application, entry, setting, assist):
        self._setting = setting
        self._assist = assist
        super().__init__(application, entry)

    def _apply(self, data):
        data['assists'] = self._application.sequence.column(data['assists'], 'name')
        return super()._apply(data)

    def _process(self, request):
        count = int(self._setting.fetchByName('assists-count')['value'])
        assists = self._assist.fetchByRandom(count)
        identifier = self._get(request, 'identifier')
        self.__setup(identifier, assists)

        return {
            'assists': assists,
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
