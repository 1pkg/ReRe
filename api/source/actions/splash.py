from base import Constant
from models import Answer, Subject, Task
from .mixins import Access, FSingle


class Splash(Access, FSingle):
    CONNECTION_LIMIT = Constant.RAREFIED_CONNECTION_LIMIT
    CACHE_EXPIRE = Constant.DEFAULT_CACHE_EXPIRE

    def _process(self, request):
        db = self._application.db
        datetime = self._application.datetime
        device = self._session.user_device

        task = Task.query \
            .join(Subject, db.and_(
                Subject.id == Task.subject_id,
                Subject.orientation == device.orientation()
            )) \
            .join(Answer, db.and_(
                Answer.task_id == Task.id,
                Answer.time_stamp >= datetime.date(-Constant.DAY_COUNT_WEEK),
            )) \
            .group_by(Task.id) \
            .order_by(
                db.desc(db.func.count(Answer.id)),
                db.func.random(),
            ).first()
        if task is not None:
            splash = self._format(task, False)
            del splash['label']
            del splash['options']
            return {'splash': splash}
        return {'splash': None}
