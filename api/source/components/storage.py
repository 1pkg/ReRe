from base import Component


class Storage(Component):
    def set(self, key, value, expire=None):
        self._application.redis.hmset(key, value)
        if expire is not None:
            self._application.redis.expire(key, int(expire))

    def get(self, key):
        return self._application.redis.hgetall(key)

    def delete(self, key):
        self._application.redis.delete(key)

    def push(self, key, message):
        self._application.redis.rpush(key, message)

    def fetch(self, key):
        return self._application.redis.lrange(key, 0, -1)
