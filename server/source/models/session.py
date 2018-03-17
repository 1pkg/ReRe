from datetime import datetime

from base import Alchemy


class Session(Alchemy.Model):
    __tablename__ = 'session'

    id = Alchemy.Column(
        Alchemy.Integer,
        nullable=False,
        primary_key=True,
    )
    user_host = Alchemy.Column(
        Alchemy.String,
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
        index=True,
    )
    time_stamp = Alchemy.Column(
        Alchemy.DateTime,
        nullable=False,
        default=datetime.utcnow,
        server_default=Alchemy.text('now()')
    )

    answers = Alchemy.relationship(
        'Answer',
        backref='session',
        passive_deletes=True,
    )
