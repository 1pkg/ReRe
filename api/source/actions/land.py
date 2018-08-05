from models import Answer, Mark, Subject, Task, Type
from .mixins import Access, FList


class Land(Access, FList):
    CONNECTION_LIMIT = '3/second;30/minute;300/hour;3000/day'
    CACHE_EXPIRE = 86400

    def _process(self, request):
        random = self._application.random

        return self._format({
            'daily': random.shuffle(self.__daily()),
            'weekly': random.shuffle(self.__weekly()),
            'monthly': random.shuffle(self.__monthly()),
        })

    def __daily(self):
        db = self._application.db
        device = self._application.device
        datetime = self._application.datetime
        settings = self._application.settings

        return Task.query \
            .join(Subject, db.and_(
                Subject.id == Task.subject_id,
                Subject.orientation == device.orientation()
            )) \
            .join(Answer, db.and_(
                Answer.task_id == Task.id,
                Answer.time_stamp >= datetime.date(-1),
            )) \
            .outerjoin(Mark, db.and_(
                Mark.task_id == Task.id,
                Mark.time_stamp >= datetime.date(-1),
            )) \
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
            ).limit(settings['LAND_COUNT']).all()

    def __weekly(self):
        db = self._application.db
        device = self._application.device
        datetime = self._application.datetime
        settings = self._application.settings

        return Task.query \
            .join(Subject, db.and_(
                Subject.id == Task.subject_id,
                Subject.orientation == device.orientation()
            )) \
            .join(Answer, db.and_(
                Answer.task_id == Task.id,
                Answer.time_stamp >= datetime.date(-7),
            )) \
            .outerjoin(Mark, db.and_(
                Mark.task_id == Task.id,
                Mark.time_stamp >= datetime.date(-7),
            )) \
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
            ).limit(settings['LAND_COUNT']).all()

    def __monthly(self):
        db = self._application.db
        device = self._application.device
        datetime = self._application.datetime
        settings = self._application.settings

        return Task.query \
            .join(Subject, db.and_(
                Subject.id == Task.subject_id,
                Subject.orientation == device.orientation()
            )) \
            .join(Answer, db.and_(
                Answer.task_id == Task.id,
                Answer.time_stamp >= datetime.date(-30),
            )) \
            .outerjoin(Mark, db.and_(
                Mark.task_id == Task.id,
                Mark.time_stamp >= datetime.date(-30),
            )) \
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
            ).limit(settings['LAND_COUNT']).all()
