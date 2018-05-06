from random import shuffle

import errors
from models import Task, Orientation, Option, Subject, Effect, Setting
from .mixins import Access, Format


class Fetch(Access, Format):
    CONNECTION_LIMIT = '1/second;100/minute;10000/hour'
    CACHE_EXPIRE = None

    def _process(self, request):
        device = self._application.device

        label = str(self._get(request, 'label', ''))
        if label is not '':
            return self._format(
                self.__fetchByLabel(
                    label,
                    device.orientation(request),
                ),
            )
        elif self._application.random.roll(0.0):
            return self._format(
                self.__fetchByRandom(
                    device.orientation(request),
                ),
            )
        else:
            return self._format(
                self.__fetchNew(
                    device.orientation(request),
                ),
            )

    def __fetchByLabel(self, label, orientation):
        task = Task.query \
            .filter(
                Task.label == label,
                Task.active == True,
                Subject.orientation == orientation,
            ).one()
        if task is not None:
            return task
        return self.__fetchNew(orientation)

    def __fetchByRandom(self, orientation):
        db = self._application.db

        return Task.query \
            .filter(
                Task.active == True,
                Subject.orientation == orientation,
            ) \
            .order_by(db.func.random()).first()

    def __fetchNew(self, orientation):
        db = self._application.db
        c_hash = self._application.hash
        random = self._application.random
        sequence = self._application.sequence

        subject = Subject.query \
            .filter_by(orientation=orientation) \
            .order_by(db.func.random()).first()
        options = Option.query \
            .filter(Option.id != subject.option_id) \
            .order_by(db.func.random()) \
            .limit(int(Setting.get('option-count')) - 1).all() \
            + [subject.option]
        shuffle(options)
        effects = Effect.query \
            .order_by(db.func.random()) \
            .limit(int(Setting.get('effect-count'))).all()
        label = c_hash.hex(
            random.salt(),
            subject.id,
            sequence.column(options, 'id'),
            sequence.column(effects, 'id'),
        )
        task = Task(label=label, subject_id=subject.id)
        task.effects = effects
        task.options = options
        db.session.add(task)
        db.session.commit()
        return task
