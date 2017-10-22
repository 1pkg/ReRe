import errors
from .access import *

class Use(Access):
    def __init__(self, application, entry, setting, assist, reference, effect, task):
        self._setting = setting
        self._assist = assist
        self._reference = reference
        self._effect = effect
        self._task = task
        super().__init__(application, entry)

    def _validate(self, request):
        super()._validate(request)
        identifier = self._get(request, 'identifier')
        assist = self._get(request, 'assist')
        entry = self._entry.get(identifier)

        if (('status' not in entry) or (
            entry['status'] != self._application.STATUS_PROCESS
        )):
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
        id = entry['assists'][assist]
        del entry['assists'][assist]
        self._entry.set(identifier, entry)
        method = getattr(Use, ('_Use__' + self._assist.fetchById(id)['name']))
        return method(self, request)

    def __redo(self, request):
        identifier = self._get(request, 'identifier')
        entry = self._entry.get(identifier)
        count = int(self._setting.fetchByName('effects-count')['value'])
        effects = self._effect.fetchByRandom(count)
        entry['effects'] = self._application.sequence.column(effects, 'id')
        label = self._application.random.label()
        entry['task'] = self._task.repush(
            label,
            entry['task'],
            entry['effects']
        )
        self._entry.set(identifier, entry)
        effects = self._application.sequence.column(effects, 'name')

        return {
            'assist': 'redo',
            'label': label,
            'effects': effects,
        }

    def __infinite(self, request):
        identifier = self._get(request, 'identifier')
        entry = self._entry.get(identifier)
        entry['timestamp'] = None
        self._entry.set(identifier, entry)

        return {
            'assist': 'infinite',
            'timestamp': None,
        }

    def __reduce(self, request):
        identifier = self._get(request, 'identifier')
        entry = self._entry.get(identifier)
        entry['effects'].pop()
        self._entry.set(identifier, entry)
        effects = self._effect.fetchByIds(entry['effects'])
        effects = self._application.sequence.column(effects, 'name')

        return {
            'assist': 'reduce',
            'effects': effects,
        }

    def __statistic(self, request): # todo
        return {
            'assist': 'statistic',
            'statistic': [],
        }

    def __skip(self, request):
        identifier = self._get(request, 'identifier')
        entry = self._entry.get(identifier)
        entry['status'] = self._application.STATUS_SKIP
        self._entry.set(identifier, entry)
        task = self._application.call('fetch', request)

        task.update({'assist': 'skip',})
        return task

    def __help(self, request):
        identifier = self._get(request, 'identifier')
        entry = self._entry.get(identifier)
        option = entry['options'][entry['index']]
        reference =  self._reference.fetchRandomOneByOptionId(option)
        reference = {
            'message': reference['message'],
            'link': reference['link']
        }

        return {
            'assist': 'help',
            'reference': reference,
        }
