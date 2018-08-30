from functools import lru_cache

from base import Alchemy


class Setting(Alchemy.Model):
    NAME_CHOSE_PERIOD = 'choose-period'
    NAME_SHARE_TITLE = 'share-title'
    NAME_DISCLAIMER_TEXT = 'disclaimer-text'

    __tablename__ = 'setting'

    id = Alchemy.Column(
        Alchemy.Integer,
        nullable=False,
        primary_key=True,
    )
    name = Alchemy.Column(
        Alchemy.String,
        nullable=False,
        unique=True,
    )
    value = Alchemy.Column(
        Alchemy.String,
        nullable=False,
    )

    @staticmethod
    @lru_cache(maxsize=None)
    def get(name):
        value = Setting.query \
            .filter(Setting.name == name) \
            .one().value
        return {
            Setting.NAME_CHOSE_PERIOD: int,
            Setting.NAME_SHARE_TITLE: str,
            Setting.NAME_DISCLAIMER_TEXT: str,
        }[name](value)
