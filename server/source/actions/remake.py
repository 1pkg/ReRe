from models import Task, Effect, Setting
from .mixins import Identify, Single


class Remake(Identify, Single):
    CONNECTION_LIMIT = '1/second;100/minute;10000/hour'
    CACHE_EXPIRE = None

    def _process(self, request):
        db = self._application.db
        c_hash = self._application.hash
        random = self._application.random
        sequence = self._application.sequence

        effects = Effect.query \
            .order_by(db.func.random()) \
            .limit(int(Setting.get('effect-count'))).all()
        label = c_hash.hex(
            random.salt(),
            self._task.subject.id,
            sequence.column(self._task.options, 'id'),
            sequence.column(effects, 'id'),
        )
        task = Task(label=label, subject_id=self._task.subject_id)
        task.options = self._task.options
        task.effects = effects
        db.session.add(task)
        db.session.commit()
        return self._format(task)
