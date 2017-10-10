import errors
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
            entry['status'] != self._application.STATUS_INITIALIZE and
            entry['status'] != self._application.STATUS_RESULT_CORRECT and
            entry['status'] != self._application.STATUS_SKIP
        )):
            raise errors.Status()

        return True

    def _process(self, request):
        identifier = self._get(request, 'identifier')
        label = self._get(request, 'label')
        if (label != None):                        # directly
            return self.__fetchByLabel(identifier, label)
        elif (self._application.random.roll(0.5)): # 50%
            return self.__fetchByRating(identifier)
        elif (self._application.random.roll(0.5)): # 25%
            return self.__fetchByRandom(identifier)
        else:                                      # 25%
            return self.__fetchNew(identifier)

    def _apply(self, data):
        data['options'] = [{
            'name': option['name'],
            'category': option['category'],
            'references': self._reference.fetchByOptionId(option['id'])
        } for option in data['options']]
        data['subject'] = data['subject']['source_link']
        data['effects'] = self._application.sequence.column(data['effects'], 'name')
        return super()._apply(data)

    def __fetchByLabel(self, identifier, label):
        task = self._task.fetchByLabel(label)
        if (task == None):
            raise errors.Request('label')
        options = self._option.fetchByTaskId(task['id'])
        subject = self._subject.fetchById(task['subject_id'])
        effects = self._effect.fetchByTaskId(task['id'])
        index = self._application.sequence.index(
            options,
            lambda option: int(option['id']) == int(subject['option_id'])
        )
        self.__setup(identifier, task['id'], options, index, effects)

        return {
            'options': options,
            'subject': subject,
            'effects': effects,
        }

    def __fetchByRating(self, identifier): # todo
        return self.__fetchByRandom(identifier)

    def __fetchByRandom(self, identifier):
        task = self._task.fetchOneByRandom()
        options = self._option.fetchByTaskId(task['id'])
        subject = self._subject.fetchById(task['subject_id'])
        effects = self._effect.fetchByTaskId(task['id'])
        index = self._application.sequence.index(
            options,
            lambda option: int(option['id']) == int(subject['option_id'])
        )
        self.__setup(identifier, task['id'], options, index, effects)

        return {
            'options': options,
            'subject': subject,
            'effects': effects,
        }

    def __fetchNew(self, identifier):
        options = self._option.fetchByRandom(3)
        index = self._application.random.number(len(options))
        subject = self._subject.fetchRandomOneByOptionId(options[index]['id'])
        effects = self._effect.fetchByRandom(2)
        task = self._task.push(
            self._application.random.label(),
            subject['id'],
            self._application.sequence.column(options, 'id'),
            self._application.sequence.column(effects, 'id')
        )
        self.__setup(identifier, task, options, index, effects)

        return {
            'options': options,
            'subject': subject,
            'effects': effects,
        }

    def __setup(self, identifier, task, options, index, effects):
        entry = self._entry.get(identifier)
        entry['timestamp'] = self._application.datetime.timestamp()
        entry['status'] = self._application.STATUS_PROCESS
        entry['task'] = task
        entry['options'] = self._application.sequence.column(options, 'id')
        entry['index'] = index
        entry['effects'] = self._application.sequence.column(effects, 'id')
        entry['number'] += 1
        self._entry.set(identifier, entry)
