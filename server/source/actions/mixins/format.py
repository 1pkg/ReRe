import json

from base import Action


class Format(Action):
    def _format(self, task):
        datetime = self._application.datetime
        cache = self._application.cache
        crypto = self._application.crypto

        identity = {
            'task_id': task.id,
            'token': self._session.token,
            'timestamp': datetime.timestamp(),
        }
        key = f'token-{self._session.token}'
        cache.set(key, identity)
        subject = crypto.encrypt(
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
