import errors
from base import Action
from models import Session


class Access(Action):
    def _validate(self, request):
        super()._validate(request)
        validator = self._application.validator

        token = str(self._get(request, 'token'))
        if not validator.isHex(token):
            raise errors.Token()

        if len(token) != 128:
            raise errors.Token()

        self._session = \
            Session \
            .query \
            .filter_by(token=token) \
            .one()
        if self._session is None:
            raise errors.Token()
