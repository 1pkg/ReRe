import flask


class Redis:
    def __init__(self, connection):
        self.__connection = connection

    def _exists(self, key):
        return self.__connection.exists(key)

    def _set(self, key, value):
        self.__connection.set(key, flask.json.dumps(value))
        self.__connection.expire(key, 3600)

    def _get(self, key):
        value = self.__connection.get(key)
        if (value):
            return flask.json.loads(value)
        else:
            return None
