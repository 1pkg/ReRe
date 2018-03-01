import json

from base import Keeper


class Json(Keeper):
    def __init__(self, fileName):
        self.__fileName = fileName

    def read(self):
        with open(self.__fileName, 'r') as file:
            return json.loads(file)

    def write(self, data):
        with open(self.__fileName, 'w') as file:
            json.dump(data, file)
