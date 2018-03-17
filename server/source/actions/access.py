import errors
from base import Action
from models import Session


class Access(Action):
    def _validate(self, request):
        super()._validate(request)
        validator = self._application.validator

        self._token = str(self._get(request, 'token'))
        if not validator.isHex(self._token):
            raise errors.Token()

        if len(self._token) != 128:
            raise errors.Token()

        self._session = \
            Session \
            .query \
            .filter_by(token=self._token) \
            .one()
        if self._session is None:
            raise errors.Token()
