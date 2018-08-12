from json import dumps

from base import Action


class FSingle(Action):
    def _format(self, task, with_stat):
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
        task = {
            'options': options,
            'subject': subject,
            'effects': effects,
            'label': label,
        }
        if with_stat:
            score = self._session.account.score
            freebie = self._session.account.freebie
            stat = { 'score': score, 'freebie': freebie }
            return {
                'task': task,
                'stat': stat,
            }
        else:
            return task