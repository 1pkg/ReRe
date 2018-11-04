from base import Constant
from models import Account
from .mixins import Crypto


class Rating(Crypto):
    CACHE_EXPIRE = Constant.DEFAULT_CACHE_EXPIRE

    def _process(self, request):
        db = self._application.db
        settings = self._application.settings

        admin = Account.query \
            .filter(Account.alias == settings[Constant.SETTING_ADMIN_ALIAS]) \
            .first()

        accounts = Account.query \
            .filter(Account.id != admin.id) \
            .order_by(db.desc(Account.score)) \
            .limit(settings[Constant.SETTING_RATING_TABLE_SIZE]).all()
        return [
            {'alias': account.alias, 'score': account.score}
            for account in accounts
        ]
