from flask_sqlalchemy import SQLAlchemy as AlchemyBase
from sqlalchemy.pool import NullPool

# https://github.com/mitsuhiko/flask-sqlalchemy/pull/215


class SQLAlchemy(AlchemyBase):
    def apply_driver_hacks(self, app, info, options):
        super(SQLAlchemy, self).apply_driver_hacks(app, info, options)
        options['poolclass'] = NullPool
        options.pop('pool_size', None)


Alchemy = SQLAlchemy()
