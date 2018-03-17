from datetime import datetime

from base import Alchemy


class Answer(Alchemy.Model):
    __tablename__ = 'answer'

    id = Alchemy.Column(
        Alchemy.Integer,
        nullable=False,
        primary_key=True,
    )
    time_stamp = Alchemy.Column(
        Alchemy.DateTime,
        nullable=False,
        default=datetime.utcnow,
    )
    task_id = Alchemy.Column(
        Alchemy.Integer,
        Alchemy.ForeignKey('task.id', ondelete='cascade'),
        nullable=False,
    )
    option_id = Alchemy.Column(
        Alchemy.Integer,
        Alchemy.ForeignKey('option.id', ondelete='cascade'),
        nullable=False,
    )
    session_id = Alchemy.Column(
        Alchemy.Integer,
        Alchemy.ForeignKey('session.id', ondelete='cascade'),
        nullable=False,
    )
