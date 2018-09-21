from base import Constant
from .access import Access


class Registration(Access):
    def _registrate(self, task, answered):
        storage = self._application.storage
        datetime = self._application.datetime
        settings = self._application.settings

        identity = {
            'task_id': task.id,
            'answered': int(answered),
            'token': self._session.token,
            'timestamp': datetime.timestamp(),
        }
        storage.set(
            self._session.token,
            identity,
            settings[Constant.SETTING_IDENTITY_TIMEOUT],
        )
        return task
