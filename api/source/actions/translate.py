from os import path
from ast import literal_eval
from base64 import b64encode

from base import Constant
from errors import Extinct, Request
from .mixins import Crypto


class Translate(Crypto):
    WILDCARD_ENDPOINT = True
    CONNECTION_LIMIT = Constant.RIGID_CONNECTION_LIMIT
    CACHE_EXPIRE = Constant.DEFAULT_CACHE_EXPIRE

    def _validate(self, request):
        super()._validate(request)
        validator = self._application.validator

        try:
            self.__subjects = literal_eval(
                self._get(request, 'subjects', '[]')
            )
        except Exception:
            raise Request('subjects', self.__subjects)

        if not isinstance(self.__subjects, list) or len(self.__subjects) <= 0:
            raise Request('subjects', self.__subjects)

        for subject in self.__subjects:
            if len(subject) != Constant.NORMAL_HASH_SIZE or \
                    not validator.ishex(subject):
                raise Request('subjects', self.__subjects)

    def _process(self, request):
        main_path = self._application.path

        result = {}
        for subject in self.__subjects:
            file_path = path.join(main_path, 'subjects', f'{subject}.jpeg')
            if path.isfile(file_path):
                with open(file_path, 'rb') as file_handle:
                    result[subject] = 'data:image/jpeg;base64, ' + \
                        b64encode(file_handle.read()).decode('utf-8')
            else:
                raise Extinct(file_path)
        return result
