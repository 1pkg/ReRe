import flask
import flask_migrate
import flask_limiter
import flask_cors
import flask_mobility
import functools

import base
import components
import actions


class Application:
    def __init__(self, instance):
        self.__components = {}
        self.__actions = {}
        self.__setup(instance)
        self.__init(instance)
        self.__bind(instance)
        self.instance = instance

    def __getattr__(self, component):
        if component in self.__components:
            return self.__components[component]
        return None

    def call(self, action, request):
        if action in self.__actions:
            return self.__actions[action](request)
        return None

    def action(self, action, instance):
        try:
            return flask.jsonify(action(flask.request))
        except base.Error as error:
            return flask.jsonify({'error': str(error)})
        except Exception as exception:
            if instance.debug:
                raise exception
            else:
                instance.logger.error(str(exception))
                return flask.jsonify({'error': ''})

    def before(self):
        pass

    def after(self, response):
        return response

    def __setup(self, instance):
        instance.config.from_envvar('FLASK_SETTING')
        with instance.app_context():
            self.cors = flask_cors.CORS
            self.cors(instance)

            self.mobility = flask_mobility.Mobility
            self.mobility(instance)

            self.db = base.Alchemy
            self.db.init_app(instance)
            self.db.create_all()
            self.migrate = flask_migrate.Migrate(instance, self.db)

            remoteAddr = flask_limiter.util.get_remote_address
            self.limiter = flask_limiter.Limiter(key_func=remoteAddr)
            self.limiter.init_app(instance)

            if not instance.debug:
                instance.register_error_handler(
                    Exception,
                    lambda exception: flask.jsonify({'error': ''}),
                )

    def __init(self, instance):
        for name, component in components.__dict__.items():
            if isinstance(component, type):
                if issubclass(component, base.Component):
                    self.__components[name.lower()] = component(self)
        for name, action in actions.__dict__.items():
            if isinstance(action, type):
                if issubclass(action, base.Action):
                    self.__actions[name.lower()] = action(self)

    def __bind(self, instance):
        before = functools.partial(Application.before, self)
        after = functools.partial(Application.after, self)
        instance.before_request(before)
        instance.after_request(after)
        for alias, action in self.__actions.items():
            bndaction = functools.partial(
                Application.action,
                self,
                action,
                instance,
            )
            bndaction.__name__ = alias
            bndaction.__module__ = action.__module__
            if not instance.debug:
                self.limiter.limit(action.CONNECTION_LIMIT)(bndaction)
            rule = '/{}'.format(alias)
            req = ['GET', 'POST'] if instance.debug else ['POST']
            instance.add_url_rule(view_func=bndaction, rule=rule, methods=req)


instance = flask.Flask(__name__)
Application(instance)
