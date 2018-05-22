from enum import Enum
from datetime import datetime

from base import Alchemy


class Type(Enum):
    star = 'star'
    report = 'report'

    def __str__(self):
        return str(self.value)


class Mark(Alchemy.Model):
    __tablename__ = 'mark'

    id = Alchemy.Column(
        Alchemy.Integer,
        nullable=False,
        primary_key=True,
    )
    type = Alchemy.Column(
        Alchemy.Enum(Type),
        nullable=False,
        index=True,
    )
    time_stamp = Alchemy.Column(
        Alchemy.DateTime,
        nullable=False,
        default=datetime.utcnow,
        server_default=Alchemy.text('now()'),
    )
    task_id = Alchemy.Column(
        Alchemy.Integer,
        Alchemy.ForeignKey('task.id', ondelete='cascade'),
        nullable=False,
        index=True,
    )
    session_id = Alchemy.Column(
        Alchemy.Integer,
        Alchemy.ForeignKey('session.id', ondelete='cascade'),
        nullable=False,
        index=True,
    )
