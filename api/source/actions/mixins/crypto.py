from json import dumps

from .access import Access


class Crypto(Access):
    def _format(self, response):
        crypto = self._application.crypto

        response = crypto.encrypt(
            self._session.token,
            dumps(response),
        )
        return super()._format(response)
