import errors
from models import Answer, Setting
from .identify import Identify


class Choose(Identify):
    CONNECTION_LIMIT = '1 per second, 100 per minute'

    def _validate(self, request):
        super()._validate(request)
        validator = self._application.validator

        self.__option = self._get(request, 'option')
        if not validator.isNumeric(self.__option):
            raise errors.Request('option')

        self.__option = int(self.__option)
        if len(self._task.options) < self.__option:
            raise errors.Request('option')

    def _process(self, request):
        expire = int(Setting.get('choose-period'))
        timestamp = self._application.datetime.timestamp()
        correctOption = self._task.subject.option
        choosenOption = self._task.options[self.__option - 1]
        result = \
            timestamp - self._timestamp < expire \
            and correctOption.id == choosenOption.id
        answer = Answer(
            task_id=self._task.id,
            option_id=choosenOption.id,
            session_id=self._session.id,
        )
        self._application.db.session.add(answer)
        self._application.db.session.commit()

        return {
            'result': result,
            'option': correctOption.name,
        }
