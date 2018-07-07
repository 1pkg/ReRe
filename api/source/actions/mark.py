import errors
import models
from .mixins import Identify


class Mark(Identify):
    CONNECTION_LIMIT = '3/second;300/minute;30000/hour;3000000/day'
    CACHE_EXPIRE = None

    def _validate(self, request):
        super()._validate(request)
        db = self._application.db
        validator = self._application.validator

        self.__type = self._get(request, 'type', '')
        if not self.__type in models.Type.__members__:
            raise errors.Request('type', self.__type)
        self.__type = models.Type[self.__type]

    def _process(self, request):
        db = self._application.db

        mark = models.Mark.query \
            .filter(
                db.and_(
                    models.Mark.type == self.__type,
                    models.Mark.task_id == self._task.id,
                    models.Mark.session_id == self._session.id,
                ),
            ).first()
        if mark is None:
            mark = models.Mark(
                type=self.__type,
                task_id=self._task.id,
                session_id=self._session.id,
            )
            db.session.add(mark)
            db.session.commit()
