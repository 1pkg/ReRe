import errors
from models import Task
from .access import Access


class Identify(Access):
    def _validate(self, request):
        super()._validate(request)
        validator = self._application.validator

        key = 'token-{}'.format(self._session.token)
        identity = self._application.cache.get(key)
        if identity is None \
                or 'timestamp' not in identity \
                or not validator.isNumeric(identity['timestamp']) \
                or 'task_id' not in identity \
                or not validator.isNumeric(identity['task_id']) \
                or 'token' not in identity \
                or self._session.token != identity['token']:
            raise errors.Identity()

        self._timestamp = int(identity['timestamp'])
        self._task = Task.query \
            .get(int(identity['task_id']))
        if self._task is None:
            raise errors.Identity()