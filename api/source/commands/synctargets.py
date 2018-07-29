from json import load
from os import path, listdir

from base import Command
from models import Option, Orientation, Subject


class SyncTargets(Command):
    NAME = 'sync-targets'
    DESCRIPTION = 'Sync dump targets with database.'

    def execute(self):
        dump_targets = self.__readsync()
        with self._application.instance.app_context():
            for option in Option.query:
                for item in dump_targets:
                    if option.name == item['name']:
                        break
                else:
                    self._application.db.session.delete(option)
            for item in dump_targets:
                for option in Option.query:
                    if option.name == item['name']:
                        self.__update(option, item)
                        break
                else:
                    self.__insert(item)
            self._application.db.session.commit()

    def __insert(self, item):
        option = Option(
            name=item['name'],
            description=item['description'],
            link=item['link'],
            source=item['source'],
        )
        for subject in item['subjects']:
            subject = Subject(
                link=subject['link'],
                source=subject['source'],
                orientation=Orientation[subject['orientation']],
            )
            option.subjects.append(subject)
        self._application.db.session.add(option)

    def __update(self, option, item):
        option.description = item['description']
        option.link = item['link']
        option.source = item['source']
        for dbsubject in option.subjects:
            for subject in item['subjects']:
                if dbsubject.link == subject['link']:
                    break
            else:
                self._application.db.session.delete(dbsubject)
        for subject in item['subjects']:
            dbsubject = Subject.query \
                .filter(Subject.link == subject['link']) \
                .filter(Subject.option_id == option.id) \
                .first()
            if dbsubject is not None:
                dbsubject.source = subject['source']
                dbsubject.orientation = Orientation[subject['orientation']]
            else:
                dbsubject = Subject(
                    link=subject['link'],
                    source=subject['source'],
                    orientation=Orientation[subject['orientation']],
                )
                option.subjects.append(dbsubject)

    def __readsync(self):
        targets = []
        ipath = path.join('/', 'var', 'targets')
        for fname in listdir(ipath):
            with open(path.join(ipath, fname)) as file:
                targets += load(file)
        return targets
