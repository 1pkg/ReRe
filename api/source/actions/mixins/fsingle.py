from json import dumps

from base import Action


class FSingle(Action):
    def _format(self, task):
        crypto = self._application.crypto

        subject = crypto.encrypt(
            self._session.token,
            dumps({
                'link': task.subject.link,
                'source': task.subject.source,
                'orientation': str(task.subject.orientation),
            }),
        )
        options = [{
            'name': option.name,
            'description': option.description,
            'link': option.link,
            'source': str(option.source),
        } for option in task.options]
        effects = [{
            'name': effect.name,
        } for effect in task.effects]
        label = task.label
        return {
            'options': options,
            'subject': subject,
            'effects': effects,
            'label': label,
        }
