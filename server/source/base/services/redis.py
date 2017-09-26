import flask

from ..service import *

class Redis(Service):
    def __init__(self, connection):
        self.__connection = connection

    def _set(self, key, value):
        self.__connection.set(key, flask.json.dumps(value))
        self.__connection.expire(key, 600)

    def _get(self, key):
        value = self.__connection.get(key)
        if (value):
            return flask.json.loads(value)
        return None
