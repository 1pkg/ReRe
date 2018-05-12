from json import dumps
from collections import defaultdict

from base import Action


class List(Action):
    def _format(self, lands):
        crypto = self._application.crypto

        result = defaultdict(list)
        for land, tasks in lands.items():
            for task in tasks:
                subject = crypto.encrypt(
                    self._session.token,
                    dumps({
                        'link': task.subject.link,
                        'source': task.subject.source,
                        'orientation': str(task.subject.orientation),
                    }),
                )
                result[land].append({
                    'options': [{
                        'name': option.name,
                        'description': option.description,
                        'link': option.link,
                        'source': str(option.source),
                    } for option in task.options],
                    'subject': subject,
                    'effects': [{'name': effect.name} for effect in task.effects],
                    'label': task.label,
                })
        return result
