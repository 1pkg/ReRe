from json import dumps

from base import Action
from models import Answer


class FSingle(Action):
    def _format(self, task):
        subject = {
            'link': task.subject.link,
            'source': task.subject.source,
            'orientation': str(task.subject.orientation),
        }
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
        complexity = self._complexity(task)
        task = {
            'options': options,
            'subject': subject,
            'effects': effects,
            'label': label,
            'complexity': complexity,
        }
        return super()._format(task)

    def _complexity(self, task):
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
