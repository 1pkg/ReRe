from base import Constant, Component


class Storage(Component):
    def set(self, key, value, expire=None):
        settings = self._application.settings
        default_expire = settings[Constant.SETTING_IDENTITY_TIMEOUT]
        expire = expire if expire is not None else default_expire
        cache = self._application.extensions['cache']
        cache.set(key, value, expire)

    def get(self, key):
        cache = self._application.extensions['cache']
        return cache.get(key)

    def delete(self, key):
        cache = self._application.extensions['cache']
        return cache.delete(key)