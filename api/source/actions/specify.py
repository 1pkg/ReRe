from base import Constant
from .mixins import Crypto


class Specify(Crypto):
    CONNECTION_LIMIT = Constant.RIGID_CONNECTION_LIMIT

    def _process(self, request):
        return {
            'score': self._session.account.score,
            'freebie': self._session.account.freebie,
            'factor': self._session.account.factor,
        }
