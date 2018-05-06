import os
import flask
import flask_migrate
import flask_limiter
import flask_cache
import flask_cors
import flask_mobility
import flask_mail
import functools
import werkzeug
import logging
import logging.handlers

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
        except Exception as exception:
            if instance.debug:
                raise exception
            else:
                if not instance.debug and not isinstance(exception, base.Error):
                    instance.logger.log(100, str(exception))
                return flask.jsonify({})

    def before(self):
        pass

    def after(self, response):
        return response

    def __setup(self, instance):
        instance.config.from_envvar('FLASK_SETTING')
        with instance.app_context():
            self.settings = instance.config
            self.extensions = {}

            self.db = base.Alchemy
            self.db.init_app(instance)
            self.db.create_all()

            flask_cors.CORS(instance)
            flask_mobility.Mobility(instance)
            flask_migrate.Migrate(instance, base.Alchemy)

            handler = logging.handlers.RotatingFileHandler(
                os.path.join(
                    os.path.dirname(__file__),
                    '..',
                    'logs',
                    'wit.log',
                ),
                maxBytes=100000000,
                backupCount=10,
            )
            handler.setLevel(100)
            instance.logger.addHandler(handler)

            self.extensions['mail'] = flask_mail.Mail()
            self.extensions['mail'].init_app(instance)

            remote = flask_limiter.util.get_remote_address
            self.extensions['limiter'] = flask_limiter.Limiter(key_func=remote)
            self.extensions['limiter'].init_app(instance)

            self.extensions['cache'] = flask_cache.Cache(with_jinja2_ext=False)
            self.extensions['cache'].init_app(instance)

            if not instance.debug:
                for name, exception in werkzeug.exceptions.__dict__.items():
                    if isinstance(exception, type):
                        if issubclass(exception, Exception):
                            instance.register_error_handler(
                                exception,
                                lambda exception: flask.jsonify({}),
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
        instance.add_url_rule(
            view_func=lambda:
            flask.send_from_directory(
                os.path.join(
                    os.path.dirname(__file__),
                    '..',
                    'static',
                ),
                'favicon.ico',
            ),
            rule='/favicon.ico',
        )
        for alias, action in self.__actions.items():
            bound = functools.partial(
                Application.action,
                self,
                action,
                instance,
            )
            bound.__name__ = alias
            bound.__module__ = action.__module__
            if not instance.debug:
                if action.CONNECTION_LIMIT is not None:
                    limiter = self.extensions['limiter']
                    bound = limiter.limit(action.CONNECTION_LIMIT)(bound)
                if action.CACHE_EXPIRE is not None:
                    cache = self.extensions['cache']
                    bound = cache.cached(action.CACHE_EXPIRE)(bound)
            rule = f'/{alias}'
            req = ['GET', 'POST', 'OPTIONS'] \
                if instance.debug \
                else ['POST', 'OPTIONS']
            instance.add_url_rule(view_func=bound, rule=rule, methods=req)


instance = flask.Flask(__name__)
Application(instance)
