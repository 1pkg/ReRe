import errors
from base import Action
from models import Session


class Handshake(Action):
    CONNECTION_LIMIT = '1/minute;10/hour;100/day'
    CACHE_EXPIRE = None

    def _validate(self, request):
        super()._validate(request)
        validator = self._application.validator
        self.__userHost = str(self._application.http.userHost(request))
        self.__userAgent = str(self._application.http.userAgent(request))
        self.__userIp = str(self._application.http.userIp(request))

        if validator.isEmpty(self.__userHost):
            raise errors.Request('user_host')

        if validator.isEmpty(self.__userAgent):
            raise errors.Request('user_agent')

        if validator.isEmpty(self.__userIp):
            raise errors.Request('user_ip')

    def _process(self, request):
        mobile = int(request.MOBILE)
        token = self._application.hash.hex(
            self._application.random.salt(),
            self.__userHost,
            self.__userAgent,
            self.__userIp,
        )
        session = Session(
            user_host=self.__userHost,
            user_agent=self.__userAgent,
            user_ip=self.__userIp,
            token=token,
        )
        self._application.db.session.add(session)
        self._application.db.session.commit()

        return {
            'token': token,
            'mobile': mobile,
        }
