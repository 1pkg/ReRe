import errors
import constants
from .access import *

class Fetch(Access):
    def __init__(self, application, entry, subject, option, reference, task, effect):
        self._subject = subject
        self._option = option
        self._reference = reference
        self._task = task
        self._effect = effect
        super().__init__(application, entry)

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

    def _apply(self, data):
        data['subject']['sourcelink'] = data['subject']['source_link']
        return super()._apply(data)

    def _excesses(self):
        return super()._excesses() + ['category_id', 'option_id', 'parent_category_id', 'task_id', 'object_id', 'source_link', 'source_alt', 'type']

    def _process(self, request):
        identifier = self._get(request, 'identifier')
        label = self._get(request, 'label')

        if (label != None):
            return self.__fetchByLabel(identifier, label)
        elif (self._application.random.roll(0.5)): # 50%
            return self.__fetchByRating(identifier)
        elif (self._application.random.roll(0.9)): # 45%
            return self.__fetchByRandom(identifier)
        else:                               # 5%
            return self.__fetchNew(identifier)

    def __fetchByLabel(self, identifier, label):
        task = self._task.fetchByLabel(label)
        if (task == None):
            raise errors.Request('label')
        options = self._option.fetchByTaskId(task['id'])
        for option in options:
            option['references'] = self._reference.fetchByOptionId(option['id'], 3)
        subject = self._subject.fetchById(task['subject_id'])
        subject['effects'] = [effect['name'] for effect in self._effect.fetchByRandom(2)]
        self._entry.fetch(
            identifier,
            task['id'],
            self._application.sequence.find(
                options,
                lambda option: int(option['id']) == int(subject['option_id'])
            )
        )

        return {
            'options': options,
            'subject': subject,
        }

    def __fetchByRating(self, identifier):
        return self.__fetchByRandom(identifier)

    def __fetchByRandom(self, identifier):
        task = self._task.fetchByRandom()
        options = self._option.fetchByTaskId(task['id'])
        for option in options:
            option['references'] = self._reference.fetchByOptionId(option['id'], 3)
        subject = self._subject.fetchById(task['subject_id'])
        subject['effects'] = [effect['name'] for effect in self._effect.fetchByRandom(2)]
        self._entry.fetch(
            identifier,
            task['id'],
            self._application.sequence.find(
                options,
                lambda option: int(option['id']) == int(subject['option_id'])
            )
        )

        return {
            'options': options,
            'subject': subject,
        }

    def __fetchNew(self, identifier):
        options = self._option.fetchByRandom(3)
        for option in options:
            option['references'] = self._reference.fetchByOptionId(option['id'], 3)
        index = self._application.random.number(len(options))
        subject = self._subject.fetchByOptionId(options[index]['id'])
        subject['effects'] = [effect['name'] for effect in self._effect.fetchByRandom(2)]
        self._entry.fetch(
            identifier,
            self._task.push(
                self._application.random.label(),
                subject['id'],
                [option['id'] for option in options]
            ),
            index
        )

        return {
            'options': options,
            'subject': subject,
        }
