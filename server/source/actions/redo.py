from base import Alchemy
from models import Task, Effect, Setting
from .identify import Identify
from .task import Task as TaskFormat


class Redo(Identify, TaskFormat):
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
        return self.format(task)
