from base import Constant
from models import Account
from .mixins import Crypto


class Table(Crypto):
    CONNECTION_LIMIT = Constant.RAREFIED_CONNECTION_LIMIT
    CACHE_EXPIRE = Constant.DEFAULT_CACHE_EXPIRE

    def _process(self, request):
        db = self._application.db
        settings = self._application.settings

        accounts = Account.query \
            .order_by(db.desc(Account.score)) \
            .limit(settings[Constant.SETTING_TABLE_SIZE]).all()
        total = Account.query.count()
        return {
            'total': total,
            'table': [
                {'alias': account.alias, 'score': account.score}
                for account in accounts
            ],
        }
