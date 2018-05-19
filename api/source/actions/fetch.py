from random import shuffle

import errors
from models import Effect, Mark, Option, Orientation, Subject, Setting, Task
from .mixins import Access, FSingleID


class Fetch(Access, FSingleID):
    CONNECTION_LIMIT = '1/second;100/minute;10000/hour'
    CACHE_EXPIRE = None

    def _process(self, request):
        random = self._application.random

        label = str(self._get(request, 'label', ''))
        if label is not '':
            task = self.__fetchByLabel(label)
        elif random.roll(0.2):   # 20%
            task = self.__fetchByRating()
        elif random.roll(0.5):   # 40%
            task = self.__fetchByRandom()
        elif random.roll(0.25):  # 10%
            task = self.__fetchByNovelty()
        else:                    # 30%
            task = self.__fetchNew()
        task = self.__fetchNew() if task is None else task
        return self._format(task)

    def __fetchByLabel(self, label):
        db = self._application.db
        device = self._application.device

        return Task.query \
            .filter(
                db.and_(
                    Task.active == True,
                    Task.label == label,
                    Subject.orientation == device.orientation(),
                ),
            ).first()

    def __fetchByRating(self):
        db = self._application.db
        device = self._application.device
        random = self._application.random

        return Task.query \
            .join(Mark) \
            .filter(
                db.and_(
                    Task.active == True,
                    Subject.orientation == device.orientation(),
                ),
            ) \
            .group_by(Task.id) \
            .order_by(
                db.func.count(Mark.id),
                db.func.random(),
            ).offset(random.number(
                Setting.get(Setting.NAME_TASK_RATING_OFFSET),
            )).first()

    def __fetchByRandom(self):
        db = self._application.db
        device = self._application.device

        return Task.query \
            .filter(
                db.and_(
                    Task.active == True,
                    Subject.orientation == device.orientation(),
                ),
            ) \
            .order_by(db.func.random())\
            .first()

    def __fetchByNovelty(self):
        db = self._application.db
        device = self._application.device
        datetime = self._application.datetime

        return Task.query \
            .filter(
                db.and_(
                    Task.active == True,
                    Subject.orientation == device.orientation(),
                    Task.time_stamp >= datetime.date(
                        Setting.get(Setting.NAME_TASK_NOVELTY_PERIOD),
                    ),
                ),
            ) \
            .order_by(db.func.random())\
            .first()

    def __fetchNew(self):
        db = self._application.db
        device = self._application.device
        datetime = self._application.datetime
        c_hash = self._application.hash
        random = self._application.random

        subject = Subject.query \
            .filter(Subject.orientation == device.orientation()) \
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
        return task
