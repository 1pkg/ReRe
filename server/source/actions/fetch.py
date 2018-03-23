import errors
from models import Task, Orientation, Option, Subject, Effect, Setting
from .access import Access
from .task import Task as TaskFormat


class Fetch(Access, TaskFormat):
    CONNECTION_LIMIT = '1 per second, 100 per minute'

    def _process(self, request):
        label = str(self._get(request, 'label', ''))
        orientation = \
            Orientation.portrait \
            if request.MOBILE else \
            Orientation.landscape
        if label is not '':
            return self._format(self.__fetchByLabel(label))
        elif self._application.random.roll(0.9):
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
        return Task.query(Subject) \
            .filter_by(orientation=orientation) \
            .order_by(self._application.db.func.random()).first()

    def __fetchNew(self, orientation):
        options = Option.query \
            .order_by(self._application.db.func.random()) \
            .limit(int(Setting.get('option-count'))).all()
        index = self._application.random.number(len(options))
        subject = Subject.query \
            .filter_by(option_id=options[index].id, orientation=orientation) \
            .order_by(self._application.db.func.random()).first()
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
