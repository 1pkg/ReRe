from .fsingle import FSingle


class FSingleIdent(FSingle):
    def _format(self, task):
        datetime = self._application.datetime
        storage = self._application.storage

        identity = {
            'task_id': task.id,
            'token': self._session.token,
            'timestamp': datetime.timestamp(),
        }
        storage.set(self._session.token, identity)
        return super()._format(task, True)
