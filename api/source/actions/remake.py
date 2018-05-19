from models import Effect, Setting, Task
from .mixins import FSingleID, Identify


class Remake(Identify, FSingleID):
    CONNECTION_LIMIT = '1/second;100/minute;10000/hour'
    CACHE_EXPIRE = None

    def _process(self, request):
        db = self._application.db
        datetime = self._application.datetime
        c_hash = self._application.hash
        random = self._application.random

        effects = Effect.query \
            .order_by(db.func.random()) \
            .limit(Setting.get(Setting.NAME_EFFECT_COUNT)).all()
        label = c_hash.hex(
            c_hash.SHORT_DIGEST,
            datetime.timestamp(),
            random.salt(),
            self._task.subject.id,
            (option.id for option in self._task.options),
            (effect.id for effect in effects),
        )
        task = Task(
            label=label,
            subject_id=self._task.subject_id,
        )
        task.options = self._task.options
        task.effects = effects
        db.session.add(task)
        db.session.commit()
        return self._format(task)
