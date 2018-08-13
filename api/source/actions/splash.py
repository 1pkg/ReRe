import base
from models import Answer, Subject, Task
from .mixins import Access, FSingle


class Splash(Access, FSingle):
    CONNECTION_LIMIT = base.Constant.RAREFIED_CONNECTION_LIMIT
    CACHE_EXPIRE = base.Constant.DEFAULT_CACHE_EXPIRE

    def _process(self, request):
        db = self._application.db
        datetime = self._application.datetime
        device = self._session.user_device

        const = base.Constant
        task = Task.query \
            .join(Subject, db.and_(
                Subject.id == Task.subject_id,
                Subject.orientation == device.orientation()
            )) \
            .join(Answer, db.and_(
                Answer.task_id == Task.id,
                Answer.time_stamp >= datetime.date(-const.DAY_COUNT_WEEK),
            )) \
            .group_by(Task.id) \
            .order_by(
                db.desc(db.func.count(Answer.id)),
                db.func.random(),
            ).first()
        splash = self._format(task, False)
        del splash['label']
        del splash['options']
        return {'splash': splash}
