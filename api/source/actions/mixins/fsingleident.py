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
        key = f'token-{self._session.token}'
        cache.set(key, identity)
        return super()._format(task)
