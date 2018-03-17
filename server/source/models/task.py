from datetime import datetime

from base import Alchemy


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
        server_default=Alchemy.text('now()'),
    )
    subject_id = Alchemy.Column(
        Alchemy.Integer,
        Alchemy.ForeignKey('subject.id', ondelete='cascade'),
        nullable=False,
        index=True,
    )

    options = Alchemy.relationship(
        'option',
        secondary='task_option',
    )
    effects = Alchemy.relationship(
        'effect',
        secondary='task_effect',
    )
    answers = Alchemy.relationship(
        'answer',
        backref='task',
        passive_deletes=True,
    )


Alchemy.Table(
    'task_option',
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

Alchemy.Table(
    'task_effect',
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
