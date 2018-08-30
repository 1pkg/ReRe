from base import Constant
from errors import Request
from models import Answer, Setting
from .mixins import Crypto, Identify, Score


class Choose(Identify, Crypto, Score):
    CONNECTION_LIMIT = Constant.RIGID_CONNECTION_LIMIT
    CACHE_EXPIRE = None

    def _validate(self, request):
        super()._validate(request)
        validator = self._application.validator

        self.__option = self._get(request, 'option')
        if not validator.isnumeric(self.__option, positive=False):
            raise Request('option', self.__option)

        self.__option = int(self.__option)
        if self.__option == -1:
            return

        if len(self._task.options) < self.__option or self.__option <= 0:
            raise Request('option', self.__option)

    def _process(self, request):
        db = self._application.db
        datetime = self._application.datetime
        storage = self._application.storage
        settings = self._application.settings

        if self.__option != -1:
            choosen = self._task.options[self.__option - 1]
            result = \
                datetime.timestamp() - self._timestamp \
                < Setting.get(Setting.NAME_CHOSE_PERIOD) \
                and self._task.subject.option.id == choosen.id
        else:
            choosen = None
            result = False

        self._calculate(
            settings[Constant.SETTING_BIG_SCORE_UNIT]
            if result else
            -settings[Constant.SETTING_BIG_SCORE_UNIT],
            False
        )
        storage.delete(self._session.token)

        option = self.__index(
            self._task.options,
            lambda option:
            option.id == self._task.subject.option.id,
        ) + 1
        answer = Answer(
            result=result,
            task_id=self._task.id,
            option_id=None if choosen is None else choosen.id,
            session_id=self._session.id,
        )
        db.session.add(answer)
        db.session.commit()
        return {
            'result': result,
            'option': option,
        }

    def __index(self, sequence, callback):
        for index, item in enumerate(sequence):
            if callback(item):
                return index
        return -1
