from .redis import *

class Entry(Redis):
    def __init__(self, connection):
        super().__init__(connection)

    def get(self, identifier):
        return self._get(identifier)

    def set(self, identifier, entry):
        return self._set(identifier, entry)

    def identify(self, identifier):
        self._set(identifier, {})
