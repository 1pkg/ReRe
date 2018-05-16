from enum import Enum
from base import Alchemy


class Orientation(Enum):
    portrait = 'portrait'
    landscape = 'landscape'

    def __str__(self):
        return str(self.value)


class Subject(Alchemy.Model):
    __tablename__ = 'subject'

    id = Alchemy.Column(
        Alchemy.Integer,
        nullable=False,
        primary_key=True,
    )
    link = Alchemy.Column(
        Alchemy.String,
        nullable=False,
        unique=True,
    )
    source = Alchemy.Column(
        Alchemy.String,
        nullable=False,
    )
    orientation = Alchemy.Column(
        Alchemy.Enum(Orientation),
        nullable=False,
        index=True,
    )
    option_id = Alchemy.Column(
        Alchemy.Integer,
        Alchemy.ForeignKey('option.id', ondelete='cascade'),
        nullable=False,
        index=True,
    )

    tasks = Alchemy.relationship(
        'Task',
        backref='subject',
        passive_deletes=True,
    )
