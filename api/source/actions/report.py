import errors
from .mixins import Identify


class Report(Identify):
    CONNECTION_LIMIT = '1/minute;10/hour;100/day'
    CACHE_EXPIRE = None

    def _validate(self, request):
        super()._validate(request)
        validator = self._application.validator
        self.__message = str(self._get(request, 'message')).strip()

        if validator.isEmpty(self.__message):
            raise errors.Request('message', self.__message)

    def _process(self, request):
        mail = self._application.mail

        subject = f'Report from {self._session.token} about task #{self._task.id}'
        result = mail.send(subject, self.__message)
        return {'result': result}
