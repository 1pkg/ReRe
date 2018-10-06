from base import Constant
from models import Answer, Subject, Task
from .mixins import Crypto


class Splash(Crypto):
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
            subject = {
                'link': task.subject.link,
                'source': task.subject.source,
                'orientation': str(task.subject.orientation),
            }
            effects = [{
                'name': effect.name,
            } for effect in task.effects]
            return {
                'subject': subject,
                'effects': effects,
            }
