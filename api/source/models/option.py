from base import Alchemy


class Option(Alchemy.Model):
    __tablename__ = 'option'

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
    description = Alchemy.Column(
        Alchemy.String,
        nullable=False,
    )
    link = Alchemy.Column(
        Alchemy.String,
        nullable=False,
    )
    source = Alchemy.Column(
        Alchemy.String,
        nullable=False,
    )

    subjects = Alchemy.relationship(
        'Subject',
        backref='option',
        passive_deletes=True,
    )
    answers = Alchemy.relationship(
        'Answer',
        backref='option',
        passive_deletes=True,
    )
