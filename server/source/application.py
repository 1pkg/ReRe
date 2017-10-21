import functools
import psycopg2
import psycopg2.extras
import redis
import flask

import base
import errors
import components
import services
import actions

class Application:
    STATUS_INITIALIZE     = 'initialize'
    STATUS_PROCESS        = 'process'
    STATUS_SKIP           = 'skip'
    STATUS_RESULT_CORRECT = 'result-correct'
    STATUS_RESULT_FAIL    = 'result-fail'

    def __init__(self, instance):
        self.__instance = instance
        self.__initialize(instance.config)
        self.__bind()

    def __getattr__(self, component):
        if (component in self.__components):
            return self.__components[component]
        return None

    def call(self, action, request):
        if(action in self.__actions):
            return self.__actions[action](request)
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

    def __initialize(self, configs):
        self.__components = {
            'datetime': components.Datetime(),
            'http': components.Http(),
            'random': components.Random(),
            'sequence': components.Sequence(),
        }

        dbConnection = psycopg2.connect(
            'host={} dbname={} user={} password={}'.format(
                configs['DB_CONNECTTION']['host'],
                configs['DB_CONNECTTION']['dbname'],
                configs['DB_CONNECTTION']['user'],
                configs['DB_CONNECTTION']['password'],
            ), cursor_factory = psycopg2.extras.RealDictCursor
        )
        redisConnection = redis.StrictRedis(
            host=configs['REDIS_CONNECTTION']['host'],
            port=configs['REDIS_CONNECTTION']['port'],
            db=configs['REDIS_CONNECTTION']['db']
        )

        self.__services = {
            'entry': services.Entry(redisConnection),
            'setting': services.Setting(dbConnection),
            'assist': services.Assist(dbConnection),
            'subject': services.Subject(dbConnection),
            'option': services.Option(dbConnection),
            'reference': services.Reference(dbConnection),
            'effect': services.Effect(dbConnection),
            'task': services.Task(dbConnection),
            'session': services.Session(dbConnection),
            'answer': services.Answer(dbConnection),
        }

        self.__actions = {
            'identify': actions.Identify(
                self,
                self.__services['entry'],
                self.__services['setting'],
                self.__services['session'],
            ),
            'initialize': actions.Initialize(
                self,
                self.__services['entry'],
                self.__services['setting'],
                self.__services['assist'],
            ),
            'fetch': actions.Fetch(
                self,
                self.__services['entry'],
                self.__services['setting'],
                self.__services['option'],
                self.__services['reference'],
                self.__services['subject'],
                self.__services['effect'],
                self.__services['task'],
            ),
            'chose': actions.Chose(
                self,
                self.__services['entry'],
                self.__services['setting'],
                self.__services['answer'],
            ),
            'use': actions.Use(
                self,
                self.__services['entry'],
                self.__services['setting'],
                self.__services['assist'],
                self.__services['reference'],
                self.__services['effect'],
                self.__services['task'],
            ),
        }

    def __bind(self):
        self.__instance.before_request(functools.partial(Application.before, self))
        self.__instance.after_request(functools.partial(Application.after, self))
        for alias, action in self.__actions.items():
            bndaction = functools.partial(Application.action, self, action)
            bndaction.__name__ = alias
            self.__instance.add_url_rule(rule=f"/{alias}", view_func=bndaction, methods=["GET"])

instance = flask.Flask(__name__)
instance.config.from_object('configuration.Development')
Application(instance)
