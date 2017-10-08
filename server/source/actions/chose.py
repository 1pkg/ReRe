import errors
import constants
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
        if (('status' not in entry) or entry['status'] != constants.STATUS_PROCESS):
            raise errors.Status()

        if (option == None or (not option.isdigit())):
            raise errors.Request('option')

        return True

    def _process(self, request):
        identifier = self._get(request, 'identifier')
        option = int(self._get(request, 'option'))

        entry = self._entry.get(identifier)
        if (self._application.datetime.timestamp() - int(entry['timestamp']) > 30):
            result = False
        else:
            result = (int(entry['option']) == option)
        self._entry.chose(identifier, result)
        option = entry['option']

        return {
            'option': option,
            'result': result,
        }
