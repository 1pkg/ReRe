from models import Task, Effect, Setting
from .identify import Identify
from .task import Task as TaskFormat


class Redo(Identify, TaskFormat):
    CONNECTION_LIMIT = '1 per second, 10 per minute'

    def _process(self, request):
        effects = Effect.query \
            .order_by(self._application.db.func.random()) \
            .limit(int(Setting.get('effect-count'))).all()
        label = self._application.hash.hex(
            self._application.random.salt(),
            self._task.subject.id,
            self._application.sequence.column(self._task.options, 'id'),
            self._application.sequence.column(effects, 'id'),
        )
        task = Task(label=label, subject_id=self._task.id)
        task.options = self._task.options
        task.effects = effects
        self._application.db.session.add(task)
        self._application.db.session.commit()
        return self._format(task)
