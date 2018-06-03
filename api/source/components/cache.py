from base import Component


class Cache(Component):
    def set(self, key, value, expire=None):
        i_expire = self._application.settings['INNER_CACHE_TIMEOUT']
        expire = expire if expire is not None else i_expire
        cache = self._application.extensions['cache']
        cache.set(key, value, expire)

    def get(self, key):
        cache = self._application.extensions['cache']
        return cache.get(key)
