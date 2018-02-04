from .access import Access
from errors import Status, Request


class Choose(Access):
    def __init__(self, application, identity, setting, session, task, answer):
        self._setting = setting
        self._session = session
        self._task = task
        self._answer = answer
        super().__init__(application, identity)

    def _validate(self, request):
        super()._validate(request)
        self.__index = self._get(request, 'index')

        if (self._entry.status != self._application.STATUS_SESSION_PROCESS):
            raise Status()

        if (not self._application.validator.isNumeric(self.__index)):
            raise Request('index')

        return True

    def _process(self, request):
        session = self._session.fetchByIdentifier(self._identifier)
        options = self._task.fetchByIdWithOptions(self._entry.taskId)
        optionIndex = options[self.__index]
        optionResult = \
            optionIndex['option_id'] == optionIndex['correct_option_id']
        optionIndex = self._application.sequence.index(
            options,
            lambda option:
                int(option['option_id']) == int(option['correct_option_id'])
        )
        self._answer.push(
            self._entry.orderNumber,
            0,
            session['id']
        )
        self._entry.chose(self._application, optionResult)
        self._identity.set(self._identifier, self._entry)

        return {
            'index': optionIndex,
            'result': optionResult,
        }
