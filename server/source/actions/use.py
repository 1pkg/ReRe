import errors
import constants
from .access import *

class Use(Access):
    def __init__(self, application, entry):
        super().__init__(application, entry)

    def _validate(self, request):
        super()._validate(request)

        identifier = self._get(request, 'identifier')
        assist = self._get(request, 'assist')

        entry = self._entry.get(identifier)
        if (('status' not in entry) or entry['status'] != constants.STATUS_PROCESS):
            raise errors.Status()

        if (assist == None or (not assist.isdigit())):
            raise errors.Request('assist')

        if (int(assist) >= len(entry['assists'])):
            raise errors.Request('assist')

        return True

    def _process(self, request):
        identifier = self._get(request, 'identifier')
        assist = int(self._get(request, 'assist'))

        entry = self._entry.get(identifier)
        self._entry.use(identifier, assist)
        assist = entry['assists'][assist]

        return {
            'assist': assist,
        }
