from .access import Access
from errors import Status, Request


class Use(Access):
    def __init__(self, application, identity, setting, effect, task):
        self._setting = setting
        self._effect = effect
        self._task = task
        super().__init__(application, identity)

    def _validate(self, request):
        super()._validate(request)
        self.__activity = self._get(request, 'activity')

        if (self._entry.status != self._entry.STATUS_SESSION_PROCESS):
            raise Status()

        if (self.__activity != 'redo' and self.__activity != 'skip'):
            raise Request('activity')

        return True

    def _process(self, request):
        method = getattr(Use, ('_Use__' + self.__activity))
        return method(self, request)

    def __redo(self, request):
        effectCount = int(self._setting.fetchValueByName('effect-count'))
        effects = self._effect.fetchByRandom(effectCount)
        effectNames = self._application.sequence.column(effects, 'name')
        effectIds = self._application.sequence.column(effects, 'id')
        self._application.hash.initialize(
            self._application.datetime.timestamp()
        )
        self._application.hash.update(str(self._entry.taskId))
        self._application.hash.update(' '.join(map(str, effectIds)))
        label = self._application.hash.result()
        self._entry.taskId = self._task.repush(
            label,
            self._entry.taskId,
            effectIds
        )
        self._identity.set(self._identifier, self._entry)

        return {
            'activity': 'redo',
            'label': label,
            'effects': effectNames,
        }

    def __skip(self, request):
        self._entry.skip()
        self._identity.set(self._identifier, self._entry)
        response = self._application.call('fetch', request)
        response.update({'activity': 'skip', })
        return response
