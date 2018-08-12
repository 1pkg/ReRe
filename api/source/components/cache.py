from base import Constant, Component


class Cache(Component):
    def set(self, key, value, expire=None):
        settings = self._application.settings
        i_expire = settings[Constant.SETTING_INNER_CACHE_TIMEOUT]
        expire = expire if expire is not None else i_expire
        cache = self._application.extensions['cache']
        cache.set(key, value, expire)

    def get(self, key):
        cache = self._application.extensions['cache']
        return cache.get(key)

    def delete(self, key):
        cache = self._application.extensions['cache']
        return cache.delete(key)