from base import Alchemy


class Effect(Alchemy.Model):
    __tablename__ = 'effect'

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
    shader = Alchemy.Column(
        Alchemy.JSON,
        nullable=False,
    )
    uniform = Alchemy.Column(
        Alchemy.JSON,
        nullable=False,
    )
