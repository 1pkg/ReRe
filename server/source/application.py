import flask
import flask_migrate
import flask_limiter
import werkzeug
import functools

import base
import components
import actions


class Application:
    def __init__(self, instance):
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

    def action(self, action):
        try:
            return flask.jsonify(action(flask.request))
        except base.Error as error:
            return flask.jsonify({'error': str(error)})
        except Exception as exception:
            if self.instance.debug:
                raise exception
            else:
                instance.logger.error(str(exception))
                return ''

    def before(self):
        pass

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

    def __setup(self, instance):
        instance.config.from_envvar('WIT_SETIING')
        with instance.app_context():
            self.db = base.Alchemy
            self.db.init_app(instance)
            self.db.create_all()
            self.migrate = flask_migrate.Migrate(instance, self.db)

            getRemoteAddr = flask_limiter.util.get_remote_address
            self.limiter = flask_limiter.Limiter(key_func=getRemoteAddr)
            self.limiter.init_app(instance)

    def __init(self, instance):
        if not instance.debug:
            for name, exception in werkzeug.exceptions.__dict__.items():
                if isinstance(exception, type) \
                        and issubclass(exception, Exception):
                    instance.register_error_handler(
                        exception,
                        lambda exception: '',
                    )
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
            )
            bndaction.__name__ = alias
            bndaction.__module__ = action.__module__
            self.limiter.limit(action.CONNECTION_LIMIT)(bndaction)
            instance.add_url_rule(
                rule='/{}'.format(alias),
                view_func=bndaction,
                methods=['GET', 'POST'],
            )


instance = flask.Flask(__name__)
Application(instance)
