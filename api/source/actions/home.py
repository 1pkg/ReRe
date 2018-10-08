from base import Constant
from models import Answer, Mark, Subject, Task, Type
from .mixins import Crypto, FList


class Home(FList, Crypto):
    CACHE_EXPIRE = Constant.DEFAULT_CACHE_EXPIRE

    def _process(self, request):
        random = self._application.random

        return {
            'daily': random.shuffle(self.__query(-Constant.DAY_COUNT_SINGLE)),
            'weekly': random.shuffle(self.__query(-Constant.DAY_COUNT_WEEK)),
            'monthly': random.shuffle(self.__query(-Constant.DAY_COUNT_MONTH)),
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
                    db.func.count(Mark.type == Type.upvote) -
                    db.func.count(Mark.type == Type.report) +
                    (db.func.count(Answer.option_id != None) / 2) -
                    (db.func.count(Answer.option_id == None) * 2),
                ),
                db.func.random(),
            ).limit(settings[Constant.SETTING_LAND_COUNT]).all()
