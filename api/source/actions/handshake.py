from base import Action, Constant
from errors import Request
from models import Account, Device, Session


class Handshake(Action):
    CONNECTION_LIMIT = Constant.RAREFIED_CONNECTION_LIMIT
    CACHE_EXPIRE = None

    def _validate(self, request):
        super()._validate(request)
        validator = self._application.validator
        http = self._application.http
        settings = self._application.settings

        self.__account_alias = self._get(request, 'alias')
        self.__account_uuid = self._get(request, 'uuid', '')
        self.__user_device = self._get(request, 'device')
        self.__user_agent = http.useragent(request)
        self.__user_ip = http.userip(request)
        self.__integrity = str(self._get(request, 'integrity'))

        if not self.__integrity == settings['INTEGRITY']:
            raise errors.Integrity(self.__integrity)

        if validator.isempty(self.__account_alias):
            raise Request('alias', self.__account_alias)

        if len(self.__account_uuid) != 32 or \
            not validator.ishex(self.__account_uuid):
            raise Request('uuid', self.__account_uuid)

        if not self.__user_device in Device.__members__:
            raise Request('device', self.__user_device)

        if validator.isempty(self.__user_agent):
            raise Request('user_agent', self.__user_agent)

        if validator.isempty(self.__user_ip):
            raise Request('user_ip', self.__user_ip)

    def _process(self, request):
        db = self._application.db
        datetime = self._application.datetime
        c_hash = self._application.hash
        random = self._application.random

        account = Account.query \
            .filter(Account.uuid == self.__account_uuid) \
            .first()
        if account is None:
            account = Account(
                alias=self.__account_alias,
                uuid=self.__account_uuid,
            )

        token = c_hash.hex(
            c_hash.LONG_DIGEST,
            datetime.timestamp(),
            random.salt(),
            self.__user_device,
            self.__user_agent,
            self.__user_ip,
            self.__integrity,
        )
        session = Session(
            user_device = Device[self.__user_device],
            user_agent=self.__user_agent,
            user_ip=self.__user_ip,
            token=token,
        )
        account.sessions.append(session)
        db.session.add(account)
        db.session.commit()

        alias = account.alias
        stat = {
            'score': account.score,
            'frebie': account.freebie,
            'factor': account.factor,
        }
        return {
            'alias': alias,
            'token': token,
            'stat': stat,
        }
