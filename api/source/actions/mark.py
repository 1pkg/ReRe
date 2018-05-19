import errors
from models import Mark as MarkModel, Type
from .mixins import Identify


class Mark(Identify):
    CONNECTION_LIMIT = '1/second;100/minute;10000/hour'
    CACHE_EXPIRE = None

    def _validate(self, request):
        super()._validate(request)
        db = self._application.db
        validator = self._application.validator

        self.__type = str(self._get(request, 'type', ''))
        if not self.__type in Type.__members__:
            raise errors.Request('type', self.__type)
        self.__type = Type[self.__type]

        mark = MarkModel.query \
            .filter(
                db.and_(
                    MarkModel.type == self.__type,
                    MarkModel.task_id == self._task.id,
                    MarkModel.session_id == self._session.id,
                ),
            ).first()
        if mark is not None:
            raise errors.Request('type', str(self.__type))

    def _process(self, request):
        db = self._application.db

        mark = MarkModel(
            type=self.__type,
            task_id=self._task.id,
            session_id=self._session.id,
        )
        db.session.add(mark)
        db.session.commit()
