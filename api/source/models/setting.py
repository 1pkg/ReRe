from functools import lru_cache

from base import Alchemy


class Setting(Alchemy.Model):
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
        return Setting.query \
            .filter_by(name=name).one().value
