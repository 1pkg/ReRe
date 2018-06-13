from json import dump

from base import Keeper


class Json(Keeper):
    def __init__(self, file_name):
        self.__file_name = file_name

    def write(self, items):
        with open(self.__file_name, 'w') as file:
            dump(items, file, indent=4)
