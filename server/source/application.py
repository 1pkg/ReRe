import functools
import psycopg2
import redis
import flask

import base
import components
import services
import actions

class Application:
    def __init__(self, instance):
        self.__components = {
            'request': components.Request(),
            'crypto': components.Crypto(),
        }

        self.__inject(instance.config);
        self.__actions = {
            'start': actions.Start(
                self,
                self.__services['entry'],
            ),
            'initialize': actions.Initialize(
                self,
                self.__services['entry'],
                self.__services['assist'],
            ),
            'fetch': actions.Fetch(
                self,
                self.__services['entry'],
                self.__services['subject'],
                self.__services['option'],
                self.__services['reference'],
                self.__services['task'],
            ),
            'chose': actions.Chose(
                self,
                self.__services['entry'],
                self.__services['task'],
            ),
        }

        instance.before_request(functools.partial(Application.before, self))
        instance.after_request(functools.partial(Application.after, self))
        for alias, action in self.__actions.items():
            bndaction = functools.partial(Application.action, self, action)
            bndaction.__name__ = alias
            instance.add_url_rule(rule=f"/{alias}", view_func=bndaction, methods=["GET"])
        self.__instance = instance

    def __inject(self, configs):
        dbConnection = psycopg2.connect(
            'host={} dbname={} user={} password={}'.format(
                configs['DB_CONNECTTION']['host'],
                configs['DB_CONNECTTION']['dbname'],
                configs['DB_CONNECTTION']['user'],
                configs['DB_CONNECTTION']['password'],
            )
        )
        redisConnection = redis.StrictRedis(
            host=configs['REDIS_CONNECTTION']['host'],
            port=configs['REDIS_CONNECTTION']['port'],
            db=configs['REDIS_CONNECTTION']['db']
        )
        self.__services = {
            'entry': services.Entry(redisConnection),
            'subject': services.Subject(dbConnection),
            'option': services.Option(dbConnection),
            'reference': services.Reference(dbConnection),
            'assist': services.Assist(dbConnection),
            'task': services.Task(dbConnection),
        }

    def __getattr__(self, component):
        if (component in self.__components):
            return self.__components[component]
        return None

    def before(self):
        pass

    def action(self, action):
        return flask.jsonify(action(flask.request))

    def after(self, response):
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
        response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
        return response

instance = flask.Flask(__name__)
instance.config.from_object('conf.Development')
Application(instance)
