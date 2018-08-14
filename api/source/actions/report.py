from base import Constant
from errors import Request
from .mixins import Identify


class Report(Identify):
    CONNECTION_LIMIT = Constant.RAREFIED_CONNECTION_LIMIT
    CACHE_EXPIRE = None

    def _validate(self, request):
        super()._validate(request)
        validator = self._application.validator
        self.__message = self._get(request, 'message', '').strip()

        if validator.isempty(self.__message):
            raise Request('message', self.__message)

    def _process(self, request):
        mail = self._application.mail

        token = self._session.token
        task_id = self._task.id
        subject = f'Report from {token} about task #{task_id}'
        mail.send(subject, self.__message)
