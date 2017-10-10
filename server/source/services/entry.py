from .redis import *

class Entry(Redis): # todo think about caching
    def __init__(self, connection):
        self.__entries = {}
        super().__init__(connection)

    def get(self, identifier):
        # if (not identifier in self.__entries):
        #     self.__entries[identifier] = self._get(identifier)
        # return self.__entries[identifier]
        return self._get(identifier)

    def set(self, identifier, entry):
        # self.__entries[identifier] = entry
        self._set(identifier, entry)

    def identify(self, identifier):
        self._set(identifier, {})
