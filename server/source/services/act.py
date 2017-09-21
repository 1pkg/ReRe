from datetime import *

import base

class Act(base.RedisService):
    def __init__(self, connection):
        super().__init__(connection)

    def get(self, identifier):
        return self._get(identifier);

    def start(self, identifier):
        entry = {}
        entry['timestamp'] = None
        entry['status'] = None
        entry['task'] = None
        entry['assists'] = None
        entry['score'] = None
        self._set(identifier, entry)

    def initialalize(self, identifier, assists):
        entry = self._get(identifier)
        entry['timestamp'] = datetime.today().timestamp()
        entry['status'] = 'initialalize'
        entry['task'] = None
        entry['assists'] = assists
        entry['score'] = 0
        self._set(identifier, entry)

    def fetch(self, identifier, task):
        entry = self._get(identifier)
        entry['timestamp'] = datetime.today().timestamp()
        entry['status'] = 'fetch'
        entry['task'] = task
        self._set(identifier, entry)

    def chose(self, identifier, result):
        entry = self._get(identifier)
        entry['timestamp'] = datetime.today().timestamp()
        if (result):
            entry['status'] = 'chose-success'
        else:
            entry['status'] = 'chose-failed'
        entry['score'] += int(result)
        self._set(hash, entry)
