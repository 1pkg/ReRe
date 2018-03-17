from datetime import datetime

from base import Alchemy

TaskOption = Alchemy.Table(
    'task_option',
    Alchemy.MetaData(),
    Alchemy.Column(
        'task_id',
        Alchemy.Integer,
        Alchemy.ForeignKey('task.id', ondelete='cascade'),
        nullable=False,
        primary_key=True,
    ),
    Alchemy.Column(
        'option_id',
        Alchemy.Integer,
        Alchemy.ForeignKey('option.id', ondelete='cascade'),
        nullable=False,
        primary_key=True,
    ),
)

TaskEffect = Alchemy.Table(
    'task_effect',
    Alchemy.MetaData(),
    Alchemy.Column(
        'task_id',
        Alchemy.Integer,
        Alchemy.ForeignKey('task.id', ondelete='cascade'),
        nullable=False,
        primary_key=True,
    ),
    Alchemy.Column(
        'effect_id',
        Alchemy.Integer,
        Alchemy.ForeignKey('effect.id', ondelete='cascade'),
        nullable=False,
        primary_key=True,
    ),
)


class Task(Alchemy.Model):
    __tablename__ = 'task'

    id = Alchemy.Column(
        Alchemy.Integer,
        nullable=False,
        primary_key=True,
    )
    label = Alchemy.Column(
        Alchemy.String,
        nullable=False,
        unique=True,
    )
    time_stamp = Alchemy.Column(
        Alchemy.DateTime,
        nullable=False,
        default=datetime.utcnow,
    )
    subject_id = Alchemy.Column(
        Alchemy.Integer,
        Alchemy.ForeignKey('subject.id', ondelete='cascade'),
        nullable=False,
    )

    options = Alchemy.relationship(
        'option',
        secondary=TaskOption,
    )
    effects = Alchemy.relationship(
        'effect',
        secondary=TaskEffect,
    )
    answers = Alchemy.relationship(
        'answer',
        backref='task',
        passive_deletes=True,
    )
