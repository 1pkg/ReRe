import random

import base
import errors
import constants

class Fetch(base.actions.Identification):
    def __init__(self, entry, subject, option, reference, task):
        self._subject = subject
        self._option = option
        self._reference = reference
        self._task = task
        super().__init__(entry)

    def _validate(self, request):
        super()._validate(request)

        identifier = self._get(request, 'identifier')

        entry = self._entry.get(identifier)
        if (('status' not in entry) or (
            entry['status'] != constants.STATUS_INITIALIZE and
            entry['status'] != constants.STATUS_RESULT_CORRECT
        )):
            raise errors.Status()

        return True

    def _process(self, request):
        identifier = self._get(request, 'identifier')

        options = self._option.fetchByRandom(3)
        for option in options:
            option['references'] = self._reference.fetchByRandomOptionId(option['id'], 3)

        index = random.randint(0, len(options) - 1)
        subject = self._subject.fetchByRandomOptionId(options[index]['id'])
        # subject['sourcealt'] = ''

        id = self._task.push(subject['id'], [option['id'] for option in options])
        self._entry.fetch(identifier, id, index)

        return {
            'options': options,
            'subject': subject,
        }
