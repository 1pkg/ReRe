from base import Alchemy
from models import Task, Effect, Setting
from .identify import Identify


class Redo(Identify):
    def _process(self, request):
        effects = \
            Effect \
            .query \
            .order_by(Alchemy.func.random()) \
            .limit(int(
                Setting
                .query
                .filter_by(name='effect-count')
                .one()
                .value
            )).all()
        label = self._application.hash.hex(
            self._application.random.salt(),
            self._application.sequence.column(self._task.options, 'id'),
            self._task.subject.id,
            self._application.sequence.column(effects, 'id'),
        )
        task = Task(
            label=label,
            subject_id=self._task.id,
        )
        task.options = self._task.options
        task.effects = effects
        Alchemy.session.add(task)
        Alchemy.session.commit()

        return {
            'identity': {
                'task_id': task.id,
                'timestamp': self._application.datetime.timestamp(),
            },
            'task': {
                'options': [{
                    'name': option.name,
                    'description': option.description,
                    'link': option.link,
                    'source': option.source,
                } for option in task.options],
                'subject': {
                    'link': task.subject.link,
                    'source': task.subject.source,
                },
                'effects': [{
                    'name': effect.name,
                    'shader': effect.shader,
                } for effect in task.effects],
                'label': task.label,
            },
        }
