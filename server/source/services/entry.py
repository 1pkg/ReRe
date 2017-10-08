import constants
from .redis import *

class Entry(Redis):
    def __init__(self, connection, timestamper):
        self.__timestamper = timestamper
        super().__init__(connection)

    def get(self, identifier):
        return self._get(identifier)

    def identify(self, identifier):
        self._set(identifier, {})

    def initialalize(self, identifier, assists):
        entry = self._get(identifier)
        entry['timestamp'] = self.__timestamper()
        entry['status'] = constants.STATUS_INITIALIZE
        entry['assists'] = assists
        entry['task'] = None
        entry['option'] = None
        entry['score'] = 0
        self._set(identifier, entry)

    def fetch(self, identifier, task, option):
        entry = self._get(identifier)
        entry['timestamp'] = self.__timestamper()
        entry['status'] = constants.STATUS_PROCESS
        entry['task'] = task
        entry['option'] = option
        self._set(identifier, entry)

    def chose(self, identifier, result):
        entry = self._get(identifier)
        entry['timestamp'] = self.__timestamper()
        if (result):
            entry['status'] = constants.STATUS_RESULT_CORRECT
            entry['score'] += 1
        else:
            entry['status'] = constants.STATUS_RESULT_FAIL
        self._set(identifier, entry)

    def use(self, identifier, assist):
        entry = self._get(identifier)
        del entry['assists'][assist]
        self._set(identifier, entry)
