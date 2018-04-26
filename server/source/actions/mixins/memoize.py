import json

from base import Action


class Memoize(Action):
    def _format(self, task):
        identity = {
            'task_id': task.id,
            'token': self._session.token,
            'timestamp': self._application.datetime.timestamp(),
        }
        key = 'token-{}'.format(self._session.token)
        self._application.cache.set(key, identity)
        subject = self._application.crypto.encrypt(
            self._session.token,
            json.dumps({
                'link': task.subject.link,
                'source': task.subject.source,
                'orientation': str(task.subject.orientation),
            }),
        )
        return {
            'options': [{
                'name': option.name,
                'description': option.description,
                'link': option.link,
                'source': str(option.source),
            } for option in task.options],
            'subject': subject,
            'effects': [{'name': effect.name} for effect in task.effects],
            'label': task.label,
        }
