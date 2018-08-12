import base
from models import Account
from .mixins import Access


class Table(Access):
    CONNECTION_LIMIT = base.Constant.RAREFIED_CONNECTION_LIMIT
    CACHE_EXPIRE = base.Constant.DEFAULT_CACHE_EXPIRE

    def _process(self, request):
        db = self._application.db
        settings = self._application.settings

        accounts = Account.query \
            .order_by(db.desc(Account.score)) \
            .limit(settings[base.Constant.SETTING_TABLE_SIZE]).all()
        total = Account.query.count()
        return {
            'table': [
                {'alias': account.alias, 'score': account.score}
                for account in accounts
            ],
            'total': total,
        }
