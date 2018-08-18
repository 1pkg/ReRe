from enum import Enum
from datetime import datetime

from base import Alchemy
from .subject import Orientation


class Device(Enum):
    desktop = 'desktop'
    tablet = 'tablet'
    mobile = 'mobile'

    def orientation(self):
        if str(self.value) == str(self.desktop):
            return Orientation.landscape
        else:
            return Orientation.portrait

    def __str__(self):
        return str(self.value)


class Session(Alchemy.Model):
    __tablename__ = 'session'

    id = Alchemy.Column(
        Alchemy.Integer,
        nullable=False,
        primary_key=True,
    )
    user_device = Alchemy.Column(
        Alchemy.Enum(Device),
        nullable=False,
    )
    user_agent = Alchemy.Column(
        Alchemy.String,
        nullable=False,
    )
    user_ip = Alchemy.Column(
        Alchemy.String,
        nullable=False,
    )
    token = Alchemy.Column(
        Alchemy.String,
        nullable=False,
        unique=True,
    )
    time_stamp = Alchemy.Column(
        Alchemy.DateTime,
        nullable=False,
        default=datetime.utcnow,
        server_default=Alchemy.text('now()'),
        index=True,
    )
    account_id = Alchemy.Column(
        Alchemy.Integer,
        Alchemy.ForeignKey('account.id', ondelete='cascade'),
        nullable=False,
        index=True,
    )

    answers = Alchemy.relationship(
        'Answer',
        backref='session',
        passive_deletes=True,
    )
    marks = Alchemy.relationship(
        'Mark',
        backref='session',
        passive_deletes=True,
    )
    shares = Alchemy.relationship(
        'Share',
        backref='session',
        passive_deletes=True,
    )
