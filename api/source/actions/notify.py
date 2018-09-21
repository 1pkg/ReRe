from base import Constant
from .mixins import Crypto


class Notify(Crypto):
    CONNECTION_LIMIT = Constant.RIGID_CONNECTION_LIMIT
    CACHE_EXPIRE = None

    def _process(self, request):
        storage = self._application.storage

        messages = storage.fetch(self._session.account.uuid)
        storage.delete(self._session.account.uuid)
        return messages
