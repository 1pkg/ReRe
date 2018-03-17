import json

import errors
from models import Task
from .access import Access


class Identify(Access):
    def _validate(self, request):
        super()._validate(request)
        validator = self._application.validator

        self._identity = str(self._get(request, 'identity'))
        try:
            self._identity = json.loads(self._identity)
        except Exception:
            raise errors.Identity()

        if 'timestamp' not in self._identity \
                or not validator.isNumeric(self._identity['timestamp']) \
                or 'task_id' not in self._identity \
                or not validator.isNumeric(self._identity['task_id']):
            raise errors.Identity()

        self._timestamp = int(self._identity['timestamp'])
        self._task = \
            Task \
            .query \
            .get(int(self._identity['task_id']))
        if self._task is None:
            raise errors.Identity()
