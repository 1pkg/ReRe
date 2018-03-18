import json

import errors
from models import Task, Setting
from .access import Access


class Identify(Access):
    def _validate(self, request):
        super()._validate(request)
        validator = self._application.validator

        identity = self._application.crypto.decrypt(
            Setting
            .query
            .filter_by(name='identity-secret-key')
            .one()
            .value,
            str(self._get(request, 'identity')),
        )
        identity = json.loads(identity)
        if 'timestamp' not in identity \
                or not validator.isNumeric(identity['timestamp']) \
                or 'task_id' not in identity \
                or not validator.isNumeric(identity['task_id']) \
                or 'token' not in identity \
                or self._session.token != identity.token:
            raise errors.Identity()

        self._timestamp = int(identity['timestamp'])
        self._task = \
            Task \
            .query \
            .get(int(identity['task_id']))
        if self._task is None:
            raise errors.Identity()
