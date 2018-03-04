import json

from base import Keeper


class Json(Keeper):
    def __init__(self, session, fileName):
        super().__init__(session)
        self.__fileName = fileName

    def write(self, items):
        data = super().write(items)
        with open(self.__fileName, 'w') as file:
            json.dump(data, file, indent=4)
