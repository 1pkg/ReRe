from errors import Request
from .mixins import Access


class Feedback(Access):
    def _validate(self, request):
        super()._validate(request)
        validator = self._application.validator
        self.__message = self._get(request, 'message', '').strip()

        if validator.isempty(self.__message):
            raise Request('message', self.__message)

    def _process(self, request):
        storage = self._application.storage
        mail = self._application.mail

        token = self._session.token
        subject = f'Feedback from {token}'
        mail.send(subject, self.__message)
        storage.push(
            self._session.account.uuid,
            '''
                Thank you for leaving feedback
                We're working on your issue
            ''',
        )
