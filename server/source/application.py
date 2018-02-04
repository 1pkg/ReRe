import functools
import psycopg2
import psycopg2.extras
import redis
import flask

import components
import services
import actions


class Application:
    STATUS_SESSION_IDENTIFIED = 'session-identified'
    STATUS_SESSION_PROCESS = 'session-process'
    STATUS_RESULT_CORRECT = 'result-correct'
    STATUS_RESULT_FAIL = 'result-fail'

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
        response.headers.add(
            'Access-Control-Allow-Origin',
            '*'
        )
        response.headers.add(
            'Access-Control-Allow-Headers',
            'Content-Type,Authorization'
        )
        response.headers.add(
            'Access-Control-Allow-Methods',
            'GET,PUT,POST,DELETE,OPTIONS'
        )
        return response

    def __initialize(self, configs):
        self.__components = {
            'datetime': components.Datetime(),
            'hash': components.Hash(),
            'http': components.Http(),
            'random': components.Random(),
            'sequence': components.Sequence(),
            'validator': components.Validator(),
        }

        dbConnection = psycopg2.connect(
            'host={} dbname={} user={} password={}'.format(
                configs['DB_CONNECTTION']['host'],
                configs['DB_CONNECTTION']['dbname'],
                configs['DB_CONNECTTION']['user'],
                configs['DB_CONNECTTION']['password'],
            ), cursor_factory=psycopg2.extras.RealDictCursor
        )
        redisConnection = redis.StrictRedis(
            host=configs['REDIS_CONNECTTION']['host'],
            port=configs['REDIS_CONNECTTION']['port'],
            db=configs['REDIS_CONNECTTION']['db']
        )

        self.__services = {
            'answer': services.Answer(dbConnection),
            'effect': services.Effect(dbConnection),
            'identity': services.Identity(redisConnection),
            'option': services.Option(dbConnection),
            'session': services.Session(dbConnection),
            'setting': services.Setting(dbConnection),
            'subject': services.Subject(dbConnection),
            'task': services.Task(dbConnection),
        }

        self.__actions = {
            'identify': actions.Identify(
                self,
                self.__services['identity'],
                self.__services['setting'],
                self.__services['session'],
            ),
            'fetch': actions.Fetch(
                self,
                self.__services['identity'],
                self.__services['setting'],
                self.__services['option'],
                self.__services['subject'],
                self.__services['effect'],
                self.__services['task'],
            ),
            'choose': actions.Choose(
                self,
                self.__services['identity'],
                self.__services['setting'],
                self.__services['session'],
                self.__services['task'],
                self.__services['answer'],
            ),
            'use': actions.Use(
                self,
                self.__services['identity'],
                self.__services['setting'],
                self.__services['effect'],
                self.__services['task'],
            ),
        }

    def __bind(self):
        self.__instance.before_request(
            functools.partial(Application.before, self)
        )
        self.__instance.after_request(
            functools.partial(Application.after, self)
        )
        for alias, action in self.__actions.items():
            bndaction = functools.partial(Application.action, self, action)
            bndaction.__name__ = alias
            self.__instance.add_url_rule(
                rule="/{0}".format(alias),
                view_func=bndaction,
                methods=["GET"]
            )


instance = flask.Flask(__name__)
instance.config.from_object('configuration.Development')
Application(instance)
