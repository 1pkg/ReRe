import flask
import flask_migrate
import functools

import base
import components
import actions


class Application:
    def __init__(self, instance):
        self.__instance = instance

        self.__components = {}
        for name, component in components.__dict__.items():
            if isinstance(component, type) \
                    and issubclass(component, base.Component):
                self.__components[name.lower()] = component()

        self.__actions = {}
        for name, action in actions.__dict__.items():
            if isinstance(action, type) \
                    and issubclass(action, base.Action):
                self.__actions[name.lower()] = action(self)

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
            '*',
        )
        response.headers.add(
            'Access-Control-Allow-Headers',
            'Content-Type,Authorization',
        )
        response.headers.add(
            'Access-Control-Allow-Methods',
            'GET,PUT,POST,DELETE,OPTIONS',
        )
        return response

    def __bind(self):
        before = functools.partial(Application.before, self)
        after = functools.partial(Application.after, self)
        self.__instance.before_request(before)
        self.__instance.after_request(after)
        for alias, action in self.__actions.items():
            bndaction = functools.partial(
                Application.action,
                self,
                action,
            )
            bndaction.__name__ = alias
            self.__instance.add_url_rule(
                rule="/{0}".format(alias),
                view_func=bndaction,
                methods=["GET"],
            )


instance = flask.Flask(__name__)
instance.config.from_object('configuration.Development')
with instance.app_context():
    base.Alchemy.init_app(instance)
    base.Alchemy.create_all()
migrate = flask_migrate.Migrate(instance, base.Alchemy)
Application(instance)
