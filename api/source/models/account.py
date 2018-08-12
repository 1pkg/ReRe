from datetime import datetime

from base import Alchemy


class Account(Alchemy.Model):
    __tablename__ = 'account'

    id = Alchemy.Column(
        Alchemy.Integer,
        nullable=False,
        primary_key=True,
    )
    uuid = Alchemy.Column(
        Alchemy.String,
        nullable=False,
        unique=True,
    )
    alias = Alchemy.Column(
        Alchemy.String,
        nullable=False,
        index=True,
    )
    score = Alchemy.Column(
        Alchemy.Integer,
        nullable=False,
        default=0,
        index=True,
    )
    freebie = Alchemy.Column(
        Alchemy.Integer,
        nullable=False,
        default=0,
    )
    factor = Alchemy.Column(
        Alchemy.Integer,
        nullable=False,
        default=1,
    )
    time_stamp = Alchemy.Column(
        Alchemy.DateTime,
        nullable=False,
        default=datetime.utcnow,
        server_default=Alchemy.text('now()'),
    )

    sessions = Alchemy.relationship(
        'Session',
        backref='account',
        passive_deletes=True,
    )
