from base import Command, Constant
from models import Effect, Option, Subject, Task


class Generate(Command):
    NAME = 'generate'
    DESCRIPTION = 'Generate new n-tasks.'

    ARGUMENTS = [
        {
            'name': 'count',
            'type': int,
            'default': Constant.DEFAULT_GENERATE_COUNT,
            'description': 'n-tasks count'
        },
    ]

    def execute(self, count):
        db = self._application.db
        datetime = self._application.datetime
        c_hash = self._application.hash
        random = self._application.random
        settings = self._application.settings

        with self._application.instance.app_context():
            for _ in range(0, count):
                subject = Subject.query \
                    .order_by(db.func.random()) \
                    .first()
                options = Option.query \
                    .filter(Option.id != subject.option_id) \
                    .order_by(db.func.random()) \
                    .limit(settings[Constant.SETTING_OPTION_COUNT] - 1).all() \
                    + [subject.option]
                options = random.shuffle(options)
                effects = Effect.query \
                    .order_by(db.func.random()) \
                    .limit(settings[Constant.SETTING_EFFECT_COUNT]).all()
                label = c_hash.hex(
                    c_hash.SHORT_DIGEST,
                    datetime.timestamp(),
                    random.salt(),
                    subject.id,
                    (option.id for option in options),
                    (effect.id for effect in effects),
                )
                task = Task(
                    label=label,
                    subject_id=subject.id,
                )
                task.effects = effects
                task.options = options
                db.session.add(task)
            db.session.commit()
