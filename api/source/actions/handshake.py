from base import Action, Constant
from errors import Integrity, Overwhelm, Request
from models import Account, Device, Session


class Handshake(Action):
    CONNECTION_LIMIT = Constant.RAREFIED_CONNECTION_LIMIT
    CACHE_EXPIRE = None

    def _validate(self, request):
        super()._validate(request)
        validator = self._application.validator
        datetime = self._application.datetime
        http = self._application.http
        settings = self._application.settings

        self.__account_alias = self._get(request, 'alias')
        self.__account_uuid = self._get(request, 'uuid', '')
        self.__user_digest = self._get(request, 'digest')
        self.__user_device = self._get(request, 'device')
        self.__user_agent = http.useragent(request)
        self.__user_ip = http.userip(request)
        self.__integrity = str(self._get(request, 'integrity'))

        if not self.__integrity == settings['INTEGRITY']:
            raise Integrity()

        if validator.isempty(self.__account_alias):
            raise Request('alias', self.__account_alias)

        if len(self.__account_uuid) != 128 or \
                not validator.ishex(self.__account_uuid):
            raise Request('uuid', self.__account_uuid)

        if validator.isempty(self.__user_digest):
            raise Request('digest', self.__user_digest)

        if not self.__user_device in Device.__members__:
            raise Request('device', self.__user_device)

        if validator.isempty(self.__user_agent):
            raise Request('user_agent', self.__user_agent)

        if validator.isempty(self.__user_ip):
            raise Request('user_ip', self.__user_ip)

        self.__account = Account.query \
            .filter(Account.uuid == self.__account_uuid) \
            .first()
        if not self._application.instance.debug and \
            self.__account is not None and \
            Session.query \
            .filter(Session.account_id == self.__account.id) \
            .filter(Session.time_stamp >= datetime.date(-Constant.DAY_COUNT_SINGLE)) \
                .count() > settings[Constant.SETTING_SESSION_DAILY_LIMIT]:
            raise Overwhelm(self.__account.id)

    def _process(self, request):
        db = self._application.db
        datetime = self._application.datetime
        c_hash = self._application.hash
        random = self._application.random
        settings = self._application.settings

        gift_threshold = settings[Constant.SETTING_FREEBIE_GIFT_THRESHOLD]
        if self.__account is None:
            self.__account = Account(
                alias=self.__account_alias,
                uuid=self.__account_uuid,
            )
        elif (len(self.__account.sessions) % gift_threshold) == 0:
            self.__account.freebie += \
                settings[Constant.SETTING_SHARE_FREEBIE_UNIT]

        alias = self.__account.alias
        token = c_hash.hex(
            c_hash.LONG_DIGEST,
            datetime.timestamp(),
            random.salt(),
            self.__user_digest,
            self.__user_device,
            self.__user_agent,
            self.__user_ip,
            self.__integrity,
        )
        session = Session(
            user_device=Device[self.__user_device],
            user_digest=self.__user_digest,
            user_agent=self.__user_agent,
            user_ip=self.__user_ip,
            token=token,
        )
        self.__account.sessions.append(session)
        db.session.add(self.__account)
        db.session.commit()
        return {
            'alias': alias,
            'token': token,
        }
