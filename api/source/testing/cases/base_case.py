import os
import flask
import unittest
import flask_redis
import mockredis

import base


class BaseCase(unittest.TestCase):
    def setUp(self):
        instance = flask.Flask(__name__)
        instance.config.from_envvar('FLASK_SETTING')
        self.settings = instance.config

        with instance.app_context():
            self.db = base.Alchemy
            self.db.init_app(instance)
            self.db.create_all()
            self.db.session.commit()
        self.redis = flask_redis.FlaskRedis.from_custom_provider(
            mockredis.MockRedis
        )
        self.redis.init_app(instance, decode_responses=True)

    def tearDown(self):
        os.unlink(
            self.settings['SQLALCHEMY_DATABASE_URI']
            .replace('sqlite:///../', '')
        )
