from enum import Enum

from base import Alchemy


class Media(Enum):
    facebook = 'facebook'
    market = 'market'
    reddit = 'reddit'

    def __str__(self):
        return str(self.value)


class Share(Alchemy.Model):
    __tablename__ = 'share'

    id = Alchemy.Column(
        Alchemy.Integer,
        nullable=False,
        primary_key=True,
    )
    media = Alchemy.Column(
        Alchemy.Enum(Media),
        nullable=False,
        index=True,
    )
    session_id = Alchemy.Column(
        Alchemy.Integer,
        Alchemy.ForeignKey('session.id', ondelete='cascade'),
        nullable=False,
        index=True,
    )
