from base import Constant
from errors import Request
from models import Share as _Share_, Media
from .mixins import Access


class Share(Access):
    CONNECTION_LIMIT = Constant.RIGID_CONNECTION_LIMIT

    def _validate(self, request):
        super()._validate(request)

        self.__media = self._get(request, 'media', '')
        if not self.__media in Media.__members__:
            raise Request('media', self.__media)
        self.__media = Media[self.__media]

    def _process(self, request):
        db = self._application.db
        storage = self._application.storage
        settings = self._application.settings

        freebie_unit = settings[Constant.SETTING_SHARE_FREEBIE_UNIT]
        if _Share_.query \
            .filter(_Share_.media == self.__media) \
            .filter(_Share_.session_id == self._session.id) \
                .first() is None:
            self._session.account.freebie += freebie_unit
            storage.push(
                self._session.account.uuid,
                f'''
                    Thank you for sharing our service
                    We're glad to present you little bonus
                    {freebie_unit} freebie for you
                ''',
            )

        share = _Share_(media=self.__media)
        share.session = self._session
        db.session.commit()
