from models import Task, Effect, Setting
from .mixins import Identify, Memoize


class Remake(Identify, Memoize):
    CONNECTION_LIMIT = '1/second;100/minute;10000/hour'
    CACHE_EXPIRE = None

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
        task = Task(label=label, subject_id=self._task.subject_id)
        task.options = self._task.options
        task.effects = effects
        self._application.db.session.add(task)
        self._application.db.session.commit()
        return self._format(task)
