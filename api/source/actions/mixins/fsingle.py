from json import dumps

from base import Action
from models import Answer


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
        task_model = task
        task = {
            'options': options,
            'subject': subject,
            'effects': effects,
            'label': label,
        }
        if with_stat:
            score = self._session.account.score
            freebie = self._session.account.freebie
            factor = self._session.account.factor
            complexity = self._complexity(task_model)
            stat = {
                'score': score,
                'freebie': freebie,
                'factor': factor,
                'complexity': complexity,
            }
            return {
                'task': task,
                'stat': stat,
            }
        else:
            return task
    
    def _complexity(self, task):
        db = self._application.db
        count = db.func.count
        total_count = Answer.query\
            .filter(Answer.task_id == task.id)\
            .count()
        if total_count > 0:
            resulted_count = Answer.query \
                .filter(Answer.task_id == task.id) \
                .filter(Answer.result == True) \
                .count()
            return int(resulted_count / total_count * 100.0)
        else:
            return 0