from random import shuffle

from base import Command
from models import \
    Effect, \
    Option, \
    Subject, \
    Setting, \
    Task


class Generate(Command):
    NAME = 'generate'
    DESCRIPTION = 'Generate new n-tasks.'

    ARGUMENTS = [
        {
            'name': 'count',
            'type': int,
            'default': 100,
            'description': 'n-tasks count'
        },
    ]

    def execute(self, count):
        db = self._application.db
        device = self._application.device
        datetime = self._application.datetime
        c_hash = self._application.hash
        random = self._application.random

        with self._application.instance.app_context():
            for _ in range(0, count):
                subject = Subject.query \
                    .order_by(db.func.random()) \
                    .first()
                options = Option.query \
                    .filter(Option.id != subject.option_id) \
                    .order_by(db.func.random()) \
                    .limit(Setting.get(Setting.NAME_OPTION_COUNT) - 1).all() \
                    + [subject.option]
                shuffle(options)
                effects = Effect.query \
                    .order_by(db.func.random()) \
                    .limit(Setting.get(Setting.NAME_EFFECT_COUNT)).all()
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
