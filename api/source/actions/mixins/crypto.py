from json import dumps

from .access import Access, Constant


class Crypto(Access):
    CACHE_EXPIRE = None

    def _format(self, response):
        crypto = self._application.crypto
        settings = self._application.settings

        ctyptokey = self._session.token \
            if not self.CACHE_EXPIRE else \
            settings[Constant.SETTING_INTEGRITY]
        response = crypto.encrypt(
            ctyptokey,
            dumps(response),
        )
        return super()._format(response)
