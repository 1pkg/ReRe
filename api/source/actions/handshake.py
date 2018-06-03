import errors
from base import Action
from models import Session


class Handshake(Action):
    CONNECTION_LIMIT = '1/second;10/minute;100/hour;1000/day'
    CACHE_EXPIRE = None

    def _validate(self, request):
        super()._validate(request)
        validator = self._application.validator
        http = self._application.http
        self.__user_host = http.userhost(request)
        self.__user_agent = http.useragent(request)
        self.__user_ip = http.userip(request)

        if validator.isempty(self.__user_host):
            raise errors.Request('user_host', self.__user_host)

        if validator.isempty(self.__user_agent):
            raise errors.Request('user_agent', self.__user_agent)

        if validator.isempty(self.__user_ip):
            raise errors.Request('user_ip', self.__user_ip)

    def _process(self, request):
        db = self._application.db
        datetime = self._application.datetime
        c_hash = self._application.hash
        random = self._application.random

        token = c_hash.hex(
            c_hash.LONG_DIGEST,
            datetime.timestamp(),
            random.salt(),
            self.__user_host,
            self.__user_agent,
            self.__user_ip,
        )
        session = Session(
            user_host=self.__user_host,
            user_agent=self.__user_agent,
            user_ip=self.__user_ip,
            token=token,
        )
        db.session.add(session)
        db.session.commit()
        return {
            'token': token,
        }
