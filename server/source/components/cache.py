from base import Component


class Cache(Component):
    def set(self, key, value, expire=900):
        self._application.extensions['cache'].set(key, value, expire)

    def get(self, key):
        return self._application.extensions['cache'].get(key)
