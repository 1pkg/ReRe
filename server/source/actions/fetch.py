from .access import Access
from errors import Status, Request


class Fetch(Access):
    def __init__(
        self,
        application,
        identity,
        setting,
        option,
        subject,
        effect,
        task
    ):
        self._setting = setting
        self._option = option
        self._subject = subject
        self._effect = effect
        self._task = task
        super().__init__(application, identity)

    def _validate(self, request):
        super()._validate(request)

        if (
            self._entry.status != self._application.STATUS_SESSION_IDENTIFIED
            and
            self._entry.status != self._application.STATUS_RESULT_CORRECT
        ):
            raise Status()

        return True

    def _process(self, request):
        label = self._get(request, 'label')
        if (label is not None):
            return self.__fetchByLabel(label)        # directly
        elif (self._application.random.roll(0.6)):
            return self.__fetchByRating()            # 60%
        elif (self._application.random.roll(0.75)):
            return self.__fetchByRandom()            # 30%
        else:
            return self.__fetchNew()                 # 10%

    def _apply(self, data):
        data['options'] = [{
            'name': option['name'],
            'hint': option['hint'],
            'link': option['link'],
        } for option in data['options']]
        data['subject'] = data['subject']['link']
        data['effects'] = \
            self._application.sequence.column(data['effects'], 'name')
        return super()._apply(data)

    def __fetchByLabel(self, label):
        task = self._task.fetchByLabel(label)
        if (task is None):
            raise Request('label')

        options = self._option.fetchByTaskId(task['id'])
        subject = self._subject.fetchById(task['subject_id'])
        effects = self._effect.fetchByTaskId(task['id'])
        self._entry.fetch(self._application, task['id'])
        self._identity.set(self._identifier, self._entry)

        return {
            'options': options,
            'subject': subject,
            'effects': effects,
            'label': label,
        }

    def __fetchByRating(self):  # todo
        return self.__fetchByRandom()

    def __fetchByRandom(self):
        task = self._task.fetchOneByRandom()
        options = self._option.fetchByTaskId(task['id'])
        subject = self._subject.fetchById(task['subject_id'])
        effects = self._effect.fetchByTaskId(task['id'])
        label = task['label']
        self._entry.fetch(self._application, task['id'])
        self._identity.set(self._identifier, self._entry)

        return {
            'options': options,
            'subject': subject,
            'effects': effects,
            'label': label,
        }

    def __fetchNew(self):
        optionsCount = int(self._setting.fetchValueByName('option-count'))
        options = self._option.fetchByRandom(optionsCount)
        optionsIds = self._application.sequence.column(options, 'id')
        index = self._application.random.number(len(options))
        subject = self._subject.fetchRandomOneByOptionId(options[index]['id'])
        effectCount = int(self._setting.fetchValueByName('effect-count'))
        effects = self._effect.fetchByRandom(effectCount)
        effectIds = self._application.sequence.column(effects, 'id')
        label = self._application.random.label()
        taskId = self._task.push(
            label,
            subject['id'],
            optionsIds,
            effectIds
        )
        self._entry.fetch(self._application, taskId)
        self._identity.set(self._identifier, self._entry)

        return {
            'options': options,
            'subject': subject,
            'effects': effects,
            'label': label,
        }
