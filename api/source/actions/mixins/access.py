import errors
from base import Action
from models import Session


class Access(Action):
    def _validate(self, request):
        super()._validate(request)
        validator = self._application.validator
        datetime = self._application.datetime

        token = str(self._get(request, 'token'))
        if len(token) != 32 or not validator.isHex(token):
            raise errors.Token(token)

        self._session = Session.query \
            .filter(Session.token == token) \
            .first()
        if self._session is None \
                or datetime.diff(self._session.time_stamp) > 21600:
            raise errors.Token(token)
