from models import Effect, Task
from .mixins import FSingleIdent, Identify


class Remake(Identify, FSingleIdent):
    CONNECTION_LIMIT = '3/second;300/minute;30000/hour;3000000/day'
    CACHE_EXPIRE = None

    def _process(self, request):
        db = self._application.db
        datetime = self._application.datetime
        c_hash = self._application.hash
        random = self._application.random
        settings = self._application.settings

        effects = Effect.query \
            .order_by(db.func.random()) \
            .limit(settings['EFFECT_COUNT']).all()
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
