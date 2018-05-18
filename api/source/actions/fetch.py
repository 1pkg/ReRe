from random import shuffle

import errors
from models import Task, Orientation, Option, Subject, Effect, Setting
from .mixins import Access, FSingleID


class Fetch(Access, FSingleID):
    CONNECTION_LIMIT = '1/second;100/minute;10000/hour'
    CACHE_EXPIRE = None

    def _process(self, request):
        label = str(self._get(request, 'label', ''))
        if label is not '':
            task = self.__fetchByLabel(label)
        elif self._application.random.roll(0.5):
            task = self.__fetchByRating()
        elif self._application.random.roll(0.5):
            task = self.__fetchByRandom()
        else:
            task = self.__fetchNew()
        task = self.__fetchNew() if task is None else task
        return self._format(task)

    def __fetchByLabel(self, label):
        device = self._application.device

        return Task.query \
            .filter(
                Task.active == True,
                Task.label == label,
                Subject.orientation == device.orientation(),
            ).first()

    def __fetchByRating(self):
        return self.__fetchByRandom()

    def __fetchByRandom(self):
        db = self._application.db
        device = self._application.device

        return Task.query \
            .filter(
                Task.active == True,
                Subject.orientation == device.orientation(),
            ) \
            .order_by(db.func.random()).first()

    def __fetchNew(self):
        db = self._application.db
        device = self._application.device
        datetime = self._application.datetime
        c_hash = self._application.hash
        random = self._application.random

        subject = Subject.query \
            .filter_by(orientation=device.orientation()) \
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
        return task
