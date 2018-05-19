from models import Mark, Setting, Subject, Task
from .mixins import Access, FList


class Land(Access, FList):
    CONNECTION_LIMIT = '1/minute;10/hour;100/day'
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
            .join(Mark) \
            .filter(
                db.and_(
                    Task.active == True,
                    Subject.orientation == device.orientation(),
                    Task.time_stamp >= datetime.date(-1),
                ),
            ) \
            .group_by(Task.id) \
            .order_by(
                db.func.count(Mark.id),
                db.func.random(),
            ).limit(Setting.get(Setting.NAME_LAND_COUNT)).all()

    def __weekly(self):
        db = self._application.db
        device = self._application.device
        datetime = self._application.datetime

        return Task.query \
            .join(Mark) \
            .filter(
                db.and_(
                    Task.active == True,
                    Subject.orientation == device.orientation(),
                    Task.time_stamp >= datetime.date(-7),
                ),
            ) \
            .group_by(Task.id) \
            .order_by(
                db.func.count(Mark.id),
                db.func.random(),
            ).limit(Setting.get(Setting.NAME_LAND_COUNT)).all()

    def __monthly(self):
        db = self._application.db
        device = self._application.device
        datetime = self._application.datetime

        return Task.query \
            .join(Mark) \
            .filter(
                db.and_(
                    Task.active == True,
                    Subject.orientation == device.orientation(),
                    Task.time_stamp >= datetime.date(-30),
                ),
            ) \
            .group_by(Task.id) \
            .order_by(
                db.func.count(Mark.id),
                db.func.random(),
            ).limit(Setting.get(Setting.NAME_LAND_COUNT)).all()