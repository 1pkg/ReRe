from .access import Access
from errors import Status


class Choose(Access):
    def __init__(
        self,
        application,
        identity,
        setting,
        session,
        option,
        subject,
        task,
        answer
    ):
        self._setting = setting
        self._session = session
        self._option = option
        self._subject = subject
        self._task = task
        self._answer = answer
        super().__init__(application, identity)

    def _validate(self, request):
        super()._validate(request)
        self.__option = self._get(request, 'option')

        if (self._entry.status != self._entry.STATUS_SESSION_PROCESS):
            raise Status()

        return True

    def _process(self, request):
        processExpire = int(self._setting.fetchValueByName('process-expire'))
        timestamp = self._application.datetime.timestamp()
        session = self._session.fetchByIdentifier(self._identifier)
        options = self._option.fetchByTaskId(self._entry.taskId)
        subject = self._subject.fetchByTaskId(self._entry.taskId)
        index = self._application.sequence.index(
            options,
            lambda option:
                int(option['id']) == int(subject['option_id'])
        )
        option = options[index]
        result = \
            timestamp - self._entry.timestamp < processExpire \
            and option['name'] == self.__option
        self._answer.push(
            self._entry.orderNumber,
            option['id'],
            session['id']
        )
        self._entry.chose(result)
        self._identity.set(self._identifier, self._entry)

        return {
            'option': option['name'],
            'result': result,
        }
