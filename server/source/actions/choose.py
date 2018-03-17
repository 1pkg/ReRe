import errors
from base import Alchemy
from models import Answer, Setting
from .identify import Identify


class Choose(Identify):
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
        expire = int(
            Setting
            .query
            .filter_by(name='identity-expire')
            .one().value
        )
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
        Alchemy.session.add(answer)
        Alchemy.session.commit()

        return {
            'result': result,
            'option': correctOption.name,
        }
