from random import shuffle

import errors
from models import \
    Effect, \
    Mark, \
    Option, \
    Orientation, \
    Subject, \
    Setting, \
    Task, \
    Type
from .mixins import Access, FSingleIdent


class Fetch(Access, FSingleIdent):
    CONNECTION_LIMIT = '3/second;100/minute;10000/hour;1000000/day'
    CACHE_EXPIRE = None

    def _process(self, request):
        random = self._application.random

        roll_byrating = self._application.settings['ROLL_BY_RATING']
        roll_byrandom = self._application.settings['ROLL_BY_RANDOM']
        roll_bynovelty = self._application.settings['ROLL_BY_NOVELTY']
        label = self._get(request, 'label', '')
        if label is not '':
            task = self.__bylabel(label)
        elif random.roll(roll_byrating):
            task = self.__byrating()
        elif random.roll(roll_byrandom):
            task = self.__byrandom()
        elif random.roll(roll_bynovelty):
            task = self.__bynovelty()
        else:
            task = self.__bynew()
        task = self.__bynew() if task is None else task
        return self._format(task)

    def __bylabel(self, label):
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

    def __byrating(self):
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
                db.func.count(Mark.type == Type.star) -
                db.func.count(Mark.type == Type.report),
                db.func.random(),
            ).offset(random.number(
                Setting.get(Setting.NAME_TASK_RATING_OFFSET),
            )).first()

    def __byrandom(self):
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

    def __bynovelty(self):
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

    def __bynew(self):
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
