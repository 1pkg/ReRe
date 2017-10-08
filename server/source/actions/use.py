import errors
import constants
from .access import *

class Use(Access):
    def __init__(self, application, entry, reference, task, effect):
        self._reference = reference
        self._task = task
        self._effect = effect
        super().__init__(application, entry)

    def _validate(self, request):
        super()._validate(request)
        identifier = self._get(request, 'identifier')
        assist = self._get(request, 'assist')

        entry = self._entry.get(identifier)
        if (('status' not in entry) or entry['status'] != constants.STATUS_PROCESS):
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
        self._entry.use(identifier, assist)
        assist = entry['assists'][assist]
        method = getattr(Use, ('_Use__' + assist))
        return method(self, request)

    def __redo(self, request):
        identifier = self._get(request, 'identifier')

        entry = self._entry.get(identifier)
        entry['effects'] = self._effect.fetchByRandom(2)
        entry['task'] = self._task.repush(
            self._application.random.label(),
            entry['task'],
            entry['effects']
        )
        self._entry.set(identifier, entry)

        return {
            'assist': 'redo',
            'effects': entry['effects'],
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

        return {
            'assist': 'reduce',
            'effects': entry['effects'],
        }

    def __stats(self, request): # todo
        return {
            'assist': 'stats',
        }

    def __skip(self, request): # todo
        return {
            'assist': 'skip',
        }

    def __help(self, request):
        identifier = self._get(request, 'identifier')

        entry = self._entry.get(identifier)

        return {
            'assist': 'help',
            'references': self._reference.fetchByOptionId(entry['option'], 3)
        }
