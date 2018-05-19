from functools import lru_cache

from base import Alchemy


class Setting(Alchemy.Model):
    NAME_OPTION_COUNT = 'option-count'
    NAME_EFFECT_COUNT = 'effect-count'
    NAME_LAND_COUNT = 'land-count'
    NAME_CHOSE_PERIOD = 'choose-period'
    NAME_SHARE_TITLE = 'share-title'
    NAME_COPYRIGHT_TEXT = 'copyright-text'
    NAME_DISCLAIMER_TEXT = 'disclaimer-text'
    NAME_TASK_RATING_OFFSET = 'task-rating-offset'
    NAME_TASK_NOVELTY_PERIOD = 'task-novelty-period'

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
        TYPE_MAP = {
            Setting.NAME_OPTION_COUNT: int,
            Setting.NAME_EFFECT_COUNT: int,
            Setting.NAME_LAND_COUNT: int,
            Setting.NAME_CHOSE_PERIOD: int,
            Setting.NAME_SHARE_TITLE: str,
            Setting.NAME_COPYRIGHT_TEXT: str,
            Setting.NAME_DISCLAIMER_TEXT: str,
            Setting.NAME_TASK_RATING_OFFSET: int,
            Setting.NAME_TASK_NOVELTY_PERIOD: int,
        }

        value = Setting.query \
            .filter(Setting.name == name) \
            .one().value
        return TYPE_MAP[name](value)
