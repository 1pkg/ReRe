from base import Component


class Cache(Component):
    def set(self, key, value):
        self._application.cache.set(key, value)

    def get(self, key):
        return self._application.cache.get(key)
