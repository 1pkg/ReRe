import json

from base import Keeper


class Json(Keeper):
    def __init__(self, fileName, session):
        self.__fileName = fileName
        self.__session = session

    def read(self):
        with open(self.__fileName, 'r') as file:
            return json.loads(file)

    def write(self, data):
        data = {
            'session': self.__session,
            'items': data,
        }
        with open(self.__fileName, 'w') as file:
            json.dump(data, file, indent=4)
