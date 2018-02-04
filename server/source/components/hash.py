from hashlib import blake2b


class Hash:
    def initialize(self, datetime):
        self.__hash = blake2b()
        self.__hash.update(str(datetime).encode('utf-8'))

    def result(self):
        return self.__hash.hexdigest()

    def update(self, piece):
        self.__hash.update(str(piece).encode('utf-8'))
