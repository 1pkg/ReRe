from base import Alchemy


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
        unique=True,
    )
    option_id = Alchemy.Column(
        Alchemy.Integer,
        Alchemy.ForeignKey('option.id', ondelete='cascade'),
        nullable=False,
        index=True,
    )

    tasks = Alchemy.relationship(
        'task',
        backref='subject',
        passive_deletes=True,
    )
