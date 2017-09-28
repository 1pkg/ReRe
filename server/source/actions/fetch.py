import random

import base

class Fetch(base.actions.Identification):
    def __init__(self, application, entry, subject, option, reference, task):
        self._subject = subject
        self._option = option
        self._reference = reference
        self._task = task
        super().__init__(application, entry)

    def _process(self, request):
        task = {}
        options = self._option.fetchByRandom(3)
        for option in options:
            option['references'] = self._reference.fetchByRandomOptionId(option['id'], 3)
        index = random.randint(0, len(options) - 1)
        subject = self._subject.fetchByRandomOptionId(options[index]['id'])
        # subject['sourcealt'] = ''
        identifier = self._application.request.getParam(request, 'identifier')
        id = self._task.push(subject['id'], [option['id'] for option in options])
        self._entry.fetch(identifier, id)

        return {
            'options': options,
            'subject': subject,
        }
