from models import Task, Subject, Setting
from .mixins import Access, List


class Land(Access, List):
    CONNECTION_LIMIT = '1/minute;10/hour;100/day'
    CACHE_EXPIRE = 86400

    def _process(self, request):
        device = self._application.device

        return self._format({
            'recent': self.__recent(
                device.orientation(request),
            ),
            'popular': self.__popular(
                device.orientation(request),
            ),
        })

    def __recent(self, orientation):
        db = self._application.db
        datetime = self._application.datetime

        return Task.query \
            .filter(
                Task.active == True,
                Subject.orientation == orientation,
                Task.time_stamp >= datetime.date(-1)
            ) \
            .order_by(db.func.random()) \
            .limit(int(Setting.get('land-count'))).all()

    def __popular(self, orientation):
        db = self._application.db

        return Task.query \
            .filter(
                Task.active == True,
                Subject.orientation == orientation
            ) \
            .order_by(db.func.random()) \
            .limit(int(Setting.get('land-count'))).all()
