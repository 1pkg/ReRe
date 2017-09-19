from datetime import *
import hashlib

import base

class Act(base.RedisProvider):
    def __init__(self, connection, request):
        super().__init__(connection)
        self.__request = request

    def splash(self):
        hash = self.__resolve()
        entry = self._get(hash)
        entry['score'] = 0
        entry['task'] = None
        entry['index'] = None
        entry['timestamp'] = datetime.today().timestamp()
        entry['status'] = 'splash'
        self._set(hash, entry)

    def fetch(self, task, index):
        hash = self.__resolve()
        entry = self._get(hash)
        entry['task'] = task
        entry['index'] = index
        entry['timestamp'] = datetime.today().timestamp()
        entry['status'] = 'process'
        self._set(hash, entry)

    def chose(self, index):
        hash = self.__resolve()
        entry = self._get(hash)
        entry['score'] += int(entry['index'] == index)
        entry['timestamp'] = datetime.today().timestamp()
        entry['status'] = 'result'
        self._set(hash, entry)
        return entry['index']

    def __resolve(self):
        hash = self.__find()
        if (hash == None):
            hash = self.__create()
        return hash

    def __find(self):
        hash = self.__hash(self.__request, 'salt')
        if (self._get(hash)):
            return hash
        return None

    def __create(self):
        hash = self.__hash(self.__request, 'salt')
        entry = {
            'host': self.__request.getClientHost(),
            'ip': self.__request.getClientIp(),
            'useragent': self.__request.getClientUserAgent(),
            'timestamp': datetime.today().timestamp(),
            'score': 0,
            'task': None,
            'index': None,
            'status': 'splash',
        }
        self._set(hash, entry)
        return hash

    def __hash(self, request, salt):
        hash = hashlib.md5()
        hash.update(request.getClientHost().encode('utf-8'))
        hash.update(request.getClientIp().encode('utf-8'))
        hash.update(request.getClientUserAgent().encode('utf-8'))
        hash.update(salt.encode('utf-8'))
        return hash.hexdigest()
