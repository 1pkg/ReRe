from base import Constant
from errors import Request
from models import Mark as _Mark_, Type
from .mixins import Identify


class Mark(Identify):
    CONNECTION_LIMIT = Constant.RIGID_CONNECTION_LIMIT
    CACHE_EXPIRE = None

    def _validate(self, request):
        super()._validate(request)

        self.__type = self._get(request, 'type', '')
        if not self.__type in Type.__members__:
            raise Request('type', self.__type)
        self.__type = Type[self.__type]

    def _process(self, request):
        db = self._application.db

        mark = _Mark_.query \
            .filter(_Mark_.type == self.__type) \
            .filter(_Mark_.task_id == self._task.id) \
            .filter(_Mark_.session_id == self._session.id) \
            .first()
        if mark is None:
            mark = _Mark_(type=self.__type)
            self._task.marks.append(mark)
            self._session.marks.append(mark)
            db.session.commit()
