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

        if (self._entry.status != self._application.STATUS_SESSION_PROCESS):
            raise Status()

        if (self.__activity != 'redo' or self.__activity != 'skip'):
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
        label = self._application.random.label()
        oldTaskId = self._entry.taskId
        self._entry.taskId = self._task.repush(
            label,
            oldTaskId,
            effectIds
        )
        self._identity.set(self._identifier, self._entry)

        return {
            'activity': 'redo',
            'label': label,
            'effects': effectNames,
        }

    def __skip(self, request):
        response = self._application.call('fetch', request)
        response.update({'activity': 'skip', })
        return response
