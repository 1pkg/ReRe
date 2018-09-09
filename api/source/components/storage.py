from base import Component, Storage as _Storage_


class Storage(Component):
    def set(self, key, value, expire=None):
        _Storage_.hmset(key, value)
        if expire is not None:
            _Storage_.expire(key, int(expire))

    def get(self, key):
        return _Storage_.hgetall(key)
