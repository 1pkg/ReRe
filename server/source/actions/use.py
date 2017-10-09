import errors
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

        if (('status' not in entry) or entry['status'] != self._application.STATUS_PROCESS):
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
        assistName = entry['assists'][assist]
        del entry['assists'][assist]
        self._entry.set(identifier, entry)
        method = getattr(Use, ('_Use__' + assistName))
        return method(self, request)

    def __redo(self, request):
        identifier = self._get(request, 'identifier')
        entry = self._entry.get(identifier)
        effects = self._effect.fetchByRandom(2)
        entry['effects'] = [effect['name'] for effect in effects]
        entry['task'] = self._task.repush(
            self._application.random.label(),
            entry['task'],
            [effect['id'] for effect in effects]
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
            'stats': [],
        }

    def __skip(self, request):
        identifier = self._get(request, 'identifier')
        entry = self._entry.get(identifier)
        entry['status'] = self._application.STATUS_SKIP
        self._entry.set(identifier, entry)
        task = self._application.call('fetch', request)

        return {
            'assist': 'skip',
            'task': task,
        }

    def __help(self, request):
        identifier = self._get(request, 'identifier')
        entry = self._entry.get(identifier)
        references =  self._reference.fetchByOptionId(entry['option'], 3)

        return {
            'assist': 'help',
            'references': references,
        }
