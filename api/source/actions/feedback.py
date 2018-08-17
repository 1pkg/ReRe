from base import Constant
from errors import Request
from .mixins import Access


class Feedback(Access):
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
        subject = f'Feedback from {token}'
        mail.send(subject, self.__message)
