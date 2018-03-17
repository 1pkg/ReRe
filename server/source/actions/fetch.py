import errors
from base import Alchemy
from models import Task, Option, Subject, Effect, Setting
from .access import Access


class Fetch(Access):
    def _process(self, request):
        task, label = None, str(self._get(request, 'label', ''))
        if label is not '':
            task = self.__fetchByLabel(label)
        elif self._application.random.roll(0.8):
            task = self.__fetchByRandom()
        else:
            task = self.__fetchNew()

        return {
            'identity': {
                'task_id': task.id,
                'timestamp': self._application.datetime.timestamp(),
            },
            'task': {
                'options': [{
                    'name': option.name,
                    'description': option.description,
                    'link': option.link,
                    'source': option.source,
                } for option in task.options],
                'subject': {
                    'link': task.subject.link,
                    'source': task.subject.source,
                },
                'effects': [{
                    'name': effect.name,
                    'shader': effect.shader,
                } for effect in task.effects],
                'label': task.label,
            },
        }

    def __fetchByLabel(self, label):
        task = \
            Task \
            .query \
            .filter_by(label=label) \
            .one()
        if task is not None:
            return task
        raise errors.Request('label')

    def __fetchByRandom(self):
        return \
            Task \
            .query \
            .order_by(Alchemy.func.random()) \
            .first()

    def __fetchNew(self):
        options = \
            Option \
            .query \
            .order_by(Alchemy.func.random()) \
            .limit(int(
                Setting
                .query
                .filter_by(name='option-count')
                .one().value
            )).all()
        index = self._application.random.number(len(options))
        subject = \
            Subject \
            .query \
            .filter_by(option_id=options[index].id) \
            .order_by(Alchemy.func.random()) \
            .first()
        effects = \
            Effect \
            .query \
            .order_by(Alchemy.func.random()) \
            .limit(int(
                Setting.query
                .filter_by(name='effect-count')
                .one().value
            )).all()
        label = self._application.hash.hex(
            self._application.random.salt(),
            self._application.sequence.column(options, 'id'),
            subject.id,
            self._application.sequence.column(effects, 'id'),
        )
        task = Task(
            label=label,
            subject_id=subject.id,
        )
        task.effects = effects
        task.options = options
        Alchemy.session.add(task)
        Alchemy.session.commit()
        return task
