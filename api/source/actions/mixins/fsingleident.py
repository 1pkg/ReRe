from .fsingle import FSingle


class FSingleIdent(FSingle):
    def _format(self, task):
        datetime = self._application.datetime
        cache = self._application.cache

        identity = {
            'task_id': task.id,
            'token': self._session.token,
            'timestamp': datetime.timestamp(),
        }
        cache.set(self._session.token, identity)
        return super()._format(task, True)
