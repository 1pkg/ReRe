import json

from base import Action
from models import Setting


class Task(Action):
    def _format(self, task):
        identity = self._application.crypto.encrypt(
            str(Setting.get('identity-secret-key')),
            json.dumps({
                'task_id': task.id,
                'token': self._session.token,
                'timestamp': self._application.datetime.timestamp(),
            }),
        )
        subject = self._application.crypto.encrypt(
            self._session.token,
            json.dumps({
                'link': task.subject.link,
                'source': task.subject.source,
                'orientation': str(task.subject.orientation),
            }),
        )
        return {
            'identity': identity,
            'task': {
                'options': [{
                    'name': option.name,
                    'description': option.description,
                    'link': option.link,
                    'source': str(option.source),
                } for option in task.options],
                'subject': subject,
                'effects': [{'name': effect.name} for effect in task.effects],
                'label': task.label,
            },
        }
