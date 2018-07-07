from models import Answer, Mark, Setting, Subject, Task, Type
from .mixins import Access, FList


class Land(Access, FList):
    CONNECTION_LIMIT = '3/second;30/minute;300/hour;3000/day'
    CACHE_EXPIRE = 86400

    def _process(self, request):
        device = self._application.device

        return self._format({
            'daily': self.__daily(),
            'weekly': self.__weekly(),
            'monthly': self.__monthly(),
        })

    def __daily(self):
        db = self._application.db
        device = self._application.device
        datetime = self._application.datetime

        return Task.query \
            .join(Answer) \
            .outerjoin(Mark) \
            .filter(
                db.and_(
                    Task.active == True,
                    Subject.orientation == device.orientation(),
                    Answer.time_stamp >= datetime.date(-1),
                ),
            ) \
            .group_by(Task.id) \
            .order_by(
                db.desc(
                    db.func.count(Mark.type == Type.star) -
                    db.func.count(Mark.type == Type.report) +
                    (db.func.count(Answer.id) / 2),
                ),
                db.desc(Task.id),
            ).limit(Setting.get(Setting.NAME_LAND_COUNT)).all()

    def __weekly(self):
        db = self._application.db
        device = self._application.device
        datetime = self._application.datetime

        return Task.query \
            .join(Answer) \
            .outerjoin(Mark) \
            .filter(
                db.and_(
                    Task.active == True,
                    Subject.orientation == device.orientation(),
                    Answer.time_stamp >= datetime.date(-7),
                ),
            ) \
            .group_by(Task.id) \
            .order_by(
                db.desc(
                    db.func.count(Mark.type == Type.star) -
                    db.func.count(Mark.type == Type.report) +
                    (db.func.count(Answer.id) / 2),
                ),
                db.desc(Task.id),
            ).limit(Setting.get(Setting.NAME_LAND_COUNT)).all()

    def __monthly(self):
        db = self._application.db
        device = self._application.device
        datetime = self._application.datetime

        return Task.query \
            .join(Answer) \
            .outerjoin(Mark) \
            .filter(
                db.and_(
                    Task.active == True,
                    Subject.orientation == device.orientation(),
                    Answer.time_stamp >= datetime.date(-30),
                ),
            ) \
            .group_by(Task.id) \
            .order_by(
                db.desc(
                    db.func.count(Mark.type == Type.star) -
                    db.func.count(Mark.type == Type.report) +
                    (db.func.count(Answer.id) / 2),
                ),
                db.desc(Task.id),
            ).limit(Setting.get(Setting.NAME_LAND_COUNT)).all()
