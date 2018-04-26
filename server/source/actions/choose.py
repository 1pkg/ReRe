import errors
from models import Answer, Setting
from .mixins import Identify


class Choose(Identify):
    CONNECTION_LIMIT = '1/second;100/minute;10000/hour'
    CACHE_EXPIRE = None

    def _validate(self, request):
        super()._validate(request)
        validator = self._application.validator

        self.__option = self._get(request, 'option')
        if not validator.isNumeric(self.__option, False):
            raise errors.Request('option')

        self.__option = int(self.__option)
        if self.__option == -1:
            return

        if len(self._task.options) < self.__option \
                or self.__option <= 0:
            raise errors.Request('option')

    def _process(self, request):
        expire = int(Setting.get('choose-period'))
        timestamp = self._application.datetime.timestamp()
        correctOption = self._task.subject.option
        if self.__option != -1:
            choosenOption = self._task.options[self.__option - 1]
            result = \
                timestamp - self._timestamp < expire \
                and correctOption.id == choosenOption.id
        else:
            choosenOption = None
            result = False
        sequence = self._application.sequence
        option = sequence.index(
            self._task.options,
            lambda option: option.id == correctOption.id
        ) + 1
        answer = Answer(
            task_id=self._task.id,
            option_id=None if choosenOption is None else choosenOption.id,
            session_id=self._session.id,
        )
        self._application.db.session.add(answer)
        self._application.db.session.commit()

        return {
            'result': result,
            'option': option,
        }
