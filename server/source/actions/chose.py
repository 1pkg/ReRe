from datetime import *

import base
import errors
import constants

class Chose(base.actions.Identification):
    def __init__(self, entry, task):
        self._task = task
        super().__init__(entry)

    def _validate(self, request):
        super()._validate(request)

        identifier = self._get(request, 'identifier')
        option = self._get(request, 'option')

        entry = self._entry.get(identifier)
        if (('status' not in entry) or entry['status'] != constants.STATUS_PROCESS):
            raise errors.Status()

        if (option == None or (not option.isdigit())):
            raise errors.Request('option bad value')

        return True

    def _process(self, request):
        identifier = self._get(request, 'identifier')
        option = int(self._get(request, 'option'))

        entry = self._entry.get(identifier)
        delta = int(datetime.today().timestamp() - entry['timestamp'])
        if (delta > 30):
            result = False
        else:
            result = (entry['option'] == option)
        self._entry.chose(identifier, result)
        option = entry['option']

        return {
            'option': option,
            'result': result
        }
