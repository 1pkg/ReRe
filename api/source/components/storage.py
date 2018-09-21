from base import Component, Storage as _Storage_


class Storage(Component):
    def set(self, key, value, expire=None):
        _Storage_.hmset(key, value)
        if expire is not None:
            _Storage_.expire(key, int(expire))

    def get(self, key):
        return _Storage_.hgetall(key)

    def delete(self, key):
        _Storage_.delete(key)

    def push(self, key, message):
        _Storage_.rpush(key, message)

    def fetch(self, key):
        return _Storage_.lrange(key, 0, -1)
