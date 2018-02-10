from .redis import Redis

from base import Entry


class Identity(Redis):
    def __init__(self, connection):
        self.__entries = {}
        super().__init__(connection)

    def has(self, identifier):
        return self._exists(identifier)

    def get(self, identifier):
        return Entry(self._get(identifier))

    def set(self, identifier, entry):
        self._set(identifier, entry.get())
