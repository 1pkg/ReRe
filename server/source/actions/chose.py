import errors
from .access import *

class Chose(Access):
    def __init__(self, application, entry, task):
        self._task = task
        super().__init__(application, entry)

    def _validate(self, request):
        super()._validate(request)
        identifier = self._get(request, 'identifier')
        option = self._get(request, 'option')
        entry = self._entry.get(identifier)

        if (('status' not in entry) or (
            entry['status'] != self._application.STATUS_PROCESS
        )):
            raise errors.Status()

        if (option == None or (not option.isdigit())):
            raise errors.Request('option')

        return True

    def _process(self, request):
        identifier = self._get(request, 'identifier')
        option = int(self._get(request, 'option'))
        entry = self._entry.get(identifier)
        result = entry['timestamp'] != None and \
            (self._application.datetime.timestamp() - int(entry['timestamp'])) < 30 and \
            int(entry['index']) == option
        self.__setup(identifier, result)

        return {
            'option': entry['index'],
            'result': result,
        }

    def __setup(self, identifier, result):
        entry = self._entry.get(identifier)
        entry['timestamp'] = self._application.datetime.timestamp()
        if (result):
            entry['status'] = self._application.STATUS_RESULT_CORRECT
        else:
            entry['status'] = self._application.STATUS_RESULT_FAIL
        entry['score'] += int(result)
        self._entry.set(identifier, entry)
