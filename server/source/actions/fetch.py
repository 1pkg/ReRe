from random import shuffle

import errors
from models import Task, Orientation, Option, Subject, Effect, Setting
from .mixins import Access, Memoize


class Fetch(Access, Memoize):
    CONNECTION_LIMIT = '1/second;100/minute;10000/hour'
    CACHE_EXPIRE = None

    def _process(self, request):
        label = str(self._get(request, 'label', ''))
        orientation = \
            Orientation.portrait \
            if request.MOBILE else \
            Orientation.landscape
        if label is not '':
            return self._format(self.__fetchByLabel(label))
        elif self._application.random.roll(0.0):
            return self._format(self.__fetchByRandom(orientation))
        else:
            return self._format(self.__fetchNew(orientation))

    def __fetchByLabel(self, label):
        task = Task.query \
            .filter_by(label=label).one()
        if task is not None:
            return task
        raise errors.Request('label')

    def __fetchByRandom(self, orientation):
        return Task.query \
            .filter(Subject.orientation == orientation) \
            .order_by(self._application.db.func.random()).first()

    def __fetchNew(self, orientation):
        subject = Subject.query \
            .filter_by(orientation=orientation) \
            .order_by(self._application.db.func.random()).first()
        options = Option.query \
            .filter(Option.id != subject.option_id) \
            .order_by(self._application.db.func.random()) \
            .limit(int(Setting.get('option-count')) - 1).all() \
            + [subject.option]
        shuffle(options)
        effects = Effect.query \
            .order_by(self._application.db.func.random()) \
            .limit(int(Setting.get('effect-count'))).all()
        label = self._application.hash.hex(
            self._application.random.salt(),
            subject.id,
            self._application.sequence.column(options, 'id'),
            self._application.sequence.column(effects, 'id'),
        )
        task = Task(label=label, subject_id=subject.id)
        task.effects = effects
        task.options = options
        self._application.db.session.add(task)
        self._application.db.session.commit()
        return task
