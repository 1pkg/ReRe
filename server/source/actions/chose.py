import errors
from .access import *

class Chose(Access):
    def __init__(self, application, entry, setting, answer):
        self._setting = setting
        self._answer = answer
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
        duration = int(self._setting.fetchByName('timestamp-duration')['value'])
        entry = self._entry.get(identifier)
        result = entry['timestamp'] != None and \
            (self._application.datetime.timestamp() - int(entry['timestamp'])) < duration and \
            int(entry['index']) == option
        self._answer.push(int(entry['number']), result, int(entry['options'][option]), identifier)
        self.__setup(identifier, result)

        return {
            'option': int(entry['index']),
            'result': result,
        }

    def __setup(self, identifier, result):
        entry = self._entry.get(identifier)
        entry['timestamp'] = self._application.datetime.timestamp()
        if (result):
            entry['status'] = self._application.STATUS_RESULT_CORRECT
        else:
            entry['status'] = self._application.STATUS_RESULT_FAIL
        entry['score'] = int(entry['score']) + int(result)
        self._entry.set(identifier, entry)
