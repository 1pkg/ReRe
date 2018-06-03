import errors
from .mixins import Identify


class Report(Identify):
    CONNECTION_LIMIT = '1/second;10/minute;100/hour;1000/day'
    CACHE_EXPIRE = None

    def _validate(self, request):
        super()._validate(request)
        validator = self._application.validator
        self.__message = self._get(request, 'message', '').strip()

        if validator.isempty(self.__message):
            raise errors.Request('message', self.__message)

    def _process(self, request):
        mail = self._application.mail

        token = self._session.token
        task_id = self._task.id
        subject = f'Report from {token} about task #{task_id}'
        mail.send(subject, self.__message)
