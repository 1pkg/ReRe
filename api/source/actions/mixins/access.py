from errors import Token, Request
from base import Action, Constant
from models import Session


class Access(Action):
    def _validate(self, request):
        super()._validate(request)
        validator = self._application.validator
        datetime = self._application.datetime

        token = self._get(request, 'token', '')
        if len(token) != Constant.NORMAL_HASH_SIZE or not validator.ishex(token):
            raise Request('token', token)

        self._session = Session.query \
            .filter(Session.token == token) \
            .first()
        timeout = self._application.settings[Constant.SETTING_TOKEN_TIMEOUT]
        if self._session is None \
                or datetime.diff(self._session.time_stamp) > timeout:
            raise Token(token)
