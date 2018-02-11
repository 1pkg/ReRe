import json


class Json:
    def __init__(self, fileName):
        self.__fileName = fileName

    def read(self):
        with open(self.__fileName, 'r') as ffile:
            return json.loads(ffile)

    def write(self, data):
        with open(self.__fileName, 'w') as ffile:
            json.dump(data, ffile)
