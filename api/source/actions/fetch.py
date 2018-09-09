from base import Constant
from errors import Identity
from models import \
    Answer, \
    Effect, \
    Mark, \
    Option, \
    Subject, \
    Task, \
    Type
from .mixins import Crypto, FSingle, Identify, Registration, Score


class Fetch(Registration, FSingle, Crypto, Score):
    CONNECTION_LIMIT = Constant.RIGID_CONNECTION_LIMIT
    CACHE_EXPIRE = None

    def _process(self, request):
        random = self._application.random
        settings = self._application.settings

        self._calculate(request, -settings[Constant.SETTING_BIG_SCORE_UNIT])

        roll_byrating = settings[Constant.SETTING_ROLL_BY_RATING]
        roll_byrandom = settings[Constant.SETTING_ROLL_BY_RANDOM]
        roll_bynovelty = settings[Constant.SETTING_ROLL_BY_NOVELTY]
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
        return super()._registrate(task, False)

    def _calculate(self, request, unit):
        # super duper hack
        try:
            Identify(self._application)(request)
        except Identity:
            return
        except:
            pass

        db = self._application.db
        storage = self._application.storage
        identity = storage.get(self._session.token)
        if not bool(int(identity['answered'])):
            task = Task.query.get(int(identity['task_id']))
            answer = Answer(
                result=False,
                task_id=task.id,
                option_id=None,
                session_id=self._session.id,
            )
            db.session.add(answer)
            db.session.commit()
            super()._calculate(unit, True)

    def __bylabel(self, label):
        db = self._application.db
        device = self._session.user_device

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
        random = self._application.random
        device = self._session.user_device

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
                    db.func.count(Mark.type == Type.upvote) -
                    db.func.count(Mark.type == Type.report) +
                    (db.func.count(Answer.option_id != None) / 2) -
                    (db.func.count(Answer.option_id == None) * 2),
                ),
                db.desc(Task.id),
            ).limit(Constant.DEFAULT_GENERATE_COUNT)
        return random.choose(query, query.count())

    def __byrandom(self):
        db = self._application.db
        device = self._session.user_device

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
        datetime = self._application.datetime
        device = self._session.user_device

        return Task.query \
            .join(Subject, db.and_(
                Subject.id == Task.subject_id,
                Subject.orientation == device.orientation()
            )) \
            .filter(Task.active == True) \
            .filter(
                Task.time_stamp
                >=
                datetime.date(-Constant.DAY_COUNT_SINGLE)
            ) \
            .order_by(db.func.random())\
            .first()

    def __bynew(self):
        db = self._application.db
        datetime = self._application.datetime
        c_hash = self._application.hash
        random = self._application.random
        settings = self._application.settings
        device = self._session.user_device

        subject = Subject.query \
            .filter(Subject.orientation == device.orientation()) \
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
        return task
