import base
from models import Answer, Mark, Subject, Task, Type
from .mixins import Access, FList


class Land(Access, FList):
    CONNECTION_LIMIT = base.Constant.RAREFIED_CONNECTION_LIMIT
    CACHE_EXPIRE = base.Constant.DEFAULT_CACHE_EXPIRE

    def _process(self, request):
        random = self._application.random

        const = base.Constant
        return {
            'lists': self._format({
                'daily': random.shuffle(self.__query(-const.DAY_COUNT_SINGLE)),
                'weekly': random.shuffle(self.__query(-const.DAY_COUNT_WEEK)),
                'monthly': random.shuffle(self.__query(-const.DAY_COUNT_MONTH)),
            })
        }

    def __query(self, day_count):
        db = self._application.db
        datetime = self._application.datetime
        settings = self._application.settings
        device = self._session.user_device

        return Task.query \
            .join(Subject, db.and_(
                Subject.id == Task.subject_id,
                Subject.orientation == device.orientation()
            )) \
            .join(Answer, db.and_(
                Answer.task_id == Task.id,
                Answer.time_stamp >= datetime.date(day_count),
            )) \
            .outerjoin(Mark, db.and_(
                Mark.task_id == Task.id,
                Mark.time_stamp >= datetime.date(day_count),
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
            ).limit(settings[base.Constant.SETTING_LAND_COUNT]).all()
