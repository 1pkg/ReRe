from base import Component


class Cache(Component):
    def set(self, key, value, expire=900):
        cache = self._application.extensions['cache']
        cache.set(key, value, expire)

    def get(self, key):
        cache = self._application.extensions['cache']
        return cache.get(key)
