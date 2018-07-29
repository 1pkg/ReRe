import errors
from models import \
    Answer, \
    Effect, \
    Mark, \
    Option, \
    Orientation, \
    Subject, \
    Task, \
    Type
from .mixins import Access, FSingleIdent


class Fetch(Access, FSingleIdent):
    CONNECTION_LIMIT = '3/second;300/minute;30000/hour;3000000/day'
    CACHE_EXPIRE = None

    def _process(self, request):
        db = self._application.db
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

        if task is not None:
            answer = Answer.query \
                .filter(Answer.session_id == self._session.id) \
                .filter(Answer.task_id == task.id) \
                .first()
            task = task if answer is None else None

        task = self.__bynew() if task is None else task
        return self._format(task)

    def __bylabel(self, label):
        db = self._application.db
        device = self._application.device

        return Task.query \
            .join(Subject, db.and_(
                Subject.id == Task.subject_id,
                Subject.orientation == device.orientation()
            )) \
            .filter(Task.label == label) \
            .filter(Task.active == True) \
            .first()

    def __byrating(self):
        db = self._application.db
        device = self._application.device
        random = self._application.random

        query = Task.query \
            .join(Subject, db.and_(
                Subject.id == Task.subject_id,
                Subject.orientation == device.orientation()
            )) \
            .join(Answer) \
            .outerjoin(Mark) \
            .filter(Task.active == True) \
            .group_by(Task.id) \
            .order_by(
                db.desc(
                    db.func.count(Mark.type == Type.star) -
                    db.func.count(Mark.type == Type.report) +
                    (db.func.count(Answer.option_id != None) / 2) -
                    (db.func.count(Answer.option_id == None) * 2),
                ),
                db.desc(Task.id),
            ).limit(100)
        return random.choose(query, query.count())

    def __byrandom(self):
        db = self._application.db
        device = self._application.device

        return Task.query \
            .join(Subject, db.and_(
                Subject.id == Task.subject_id,
                Subject.orientation == device.orientation()
            )) \
            .filter(Task.active == True) \
            .order_by(db.func.random())\
            .first()

    def __bynovelty(self):
        db = self._application.db
        device = self._application.device
        datetime = self._application.datetime

        return Task.query \
            .join(Subject, db.and_(
                Subject.id == Task.subject_id,
                Subject.orientation == device.orientation()
            )) \
            .filter(Task.active == True) \
            .filter(Task.time_stamp >= datetime.date(-1)) \
            .order_by(db.func.random())\
            .first()

    def __bynew(self):
        db = self._application.db
        device = self._application.device
        datetime = self._application.datetime
        c_hash = self._application.hash
        random = self._application.random
        settings = self._application.settings

        subject = Subject.query \
            .filter(Subject.orientation == device.orientation()) \
            .order_by(db.func.random()) \
            .first()
        options = Option.query \
            .filter(Option.id != subject.option_id) \
            .order_by(db.func.random()) \
            .limit(settings['OPTION_COUNT'] - 1).all() \
            + [subject.option]
        options = random.shuffle(options)
        effects = Effect.query \
            .order_by(db.func.random()) \
            .limit(settings['EFFECT_COUNT']).all()
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
