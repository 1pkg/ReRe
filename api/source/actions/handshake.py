import errors
from base import Action
from models import Session


class Handshake(Action):
    CONNECTION_LIMIT = '1/minute;10/hour;100/day'
    CACHE_EXPIRE = None

    def _validate(self, request):
        super()._validate(request)
        validator = self._application.validator
        http = self._application.http
        self.__userHost = str(http.userHost(request))
        self.__userAgent = str(http.userAgent(request))
        self.__userIp = str(http.userIp(request))

        if validator.isEmpty(self.__userHost):
            raise errors.Request('user_host', self.__userHost)

        if validator.isEmpty(self.__userAgent):
            raise errors.Request('user_agent', self.__userAgent)

        if validator.isEmpty(self.__userIp):
            raise errors.Request('user_ip', self.__userIp)

    def _process(self, request):
        db = self._application.db
        device = self._application.device
        datetime = self._application.datetime
        c_hash = self._application.hash
        random = self._application.random

        orientation = str(device.orientation())
        token = c_hash.hex(
            c_hash.LONG_DIGEST,
            datetime.timestamp(),
            random.salt(),
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
        db.session.add(session)
        db.session.commit()
        return {
            'orientation': orientation,
            'token': token,
        }
