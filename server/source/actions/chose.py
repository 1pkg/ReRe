import base

class Chose(base.actions.Identification):
    def __init__(self, application, entry, task):
        self._task = task
        super().__init__(application, entry)

    def _validate(self, request):
        if (self._application.request.getParam(request, 'option') == None):
            raise base.errors.Request('option reqired')

        return super()._validate(request)

    def _process(self, request):
        identifier = self._application.request.getParam(request, 'identifier')
        entry = self._entry.get(identifier)
        task = self._task.fetchByIdWithSubjectOption(entry['task'])
        option = self._application.request.getParam(request, 'option')
        result = option == task['option']
        self._entry.chose(identifier, result)

        return {
            'option': task['option'],
            'result': result,
        }
