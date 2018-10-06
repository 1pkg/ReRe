import os
import time
import flask
import flask_limiter
import flask_cache
import flask_cors
import flask_mail
import functools
import werkzeug
import click
import raven.contrib.flask
import logging
import flask.logging
import werkzeug.contrib.fixers

import base
import models
import actions
import components
import commands


class Application:
    def __init__(self, instance):
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
            elif not isinstance(exception, base.Error):
                instance.logger.exception(exception)
                self.sentry.captureException()
            return flask.jsonify({})

    def before(self):
        pass

    def after(self, response):
        return response

    def __init(self, instance):
        instance.config.from_envvar('FLASK_SETTING')
        self.settings = instance.config
        if instance.debug:
            current = os.path.dirname(__file__)
            self.path = os.path.join(current, '..', 'dump', 'data')
            self.lpath = os.path.join(current, '..', 'dump', 'logs')
        else:
            self.path = os.path.join('/', 'var', 'rere1')
            self.lpath = os.path.join('/', 'var', 'logs')
            instance.wsgi_app = \
                werkzeug.contrib.fixers.ProxyFix(instance.wsgi_app)
            self.sentry = raven.contrib.flask.Sentry(
                instance,
                logging=True,
                level=logging.WARNING,
            )

        const = base.Constant
        with instance.app_context():
            for _ in range(0, self.settings[const.SETTING_MAX_RECONNECTION_TRY]):
                try:
                    self.db = base.Alchemy
                    self.db.init_app(instance)
                    self.db.create_all()
                    self.db.session.commit()
                    break
                except Exception as exception:
                    time.sleep(self.settings[const.SETTING_DEFAULT_SLEEP_TIME])

            self.redis = base.Storage
            self.redis.init_app(instance, decode_responses=True)

            for _ in range(0, self.settings[const.SETTING_MAX_RECONNECTION_TRY]):
                try:
                    if self.redis.ping():
                        break
                    else:
                        raise Exception()
                except Exception as exception:
                    time.sleep(self.settings[const.SETTING_DEFAULT_SLEEP_TIME])

            flask_cors.CORS(instance)

            self.extensions = {}
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

        if not instance.debug:
            instance.logger.removeHandler(flask.logging.default_handler)
            handler = logging.FileHandler(
                os.path.join(self.lpath, 'api.log'),
            )
            handler.setLevel(logging.WARNING)
            instance.logger.addHandler(handler)

        self.__components = {}
        for name, component in components.__dict__.items():
            if isinstance(component, type):
                if issubclass(component, base.Component):
                    self.__components[name.lower()] = component(self)

        self.__actions = {}
        for name, action in actions.__dict__.items():
            if isinstance(action, type):
                if issubclass(action, base.Action):
                    self.__actions[name.lower()] = action(self)

        for name, command in commands.__dict__.items():
            if isinstance(command, type):
                if issubclass(command, base.Command):
                    cmd = functools.partial(command.execute, command(self))
                    cmd.__name__ = command.NAME
                    cmd = click.command()(cmd)
                    cmd.short_help = command.DESCRIPTION
                    for argument in command.ARGUMENTS:
                        cmd = click.option(
                            '--' + argument['name'],
                            type=argument['type'],
                            default=argument['default'],
                            help=argument['description'],
                        )(cmd)
                    instance.cli.add_command(cmd)

    def __bind(self, instance):
        before = functools.partial(Application.before, self)
        after = functools.partial(Application.after, self)
        instance.before_request(before)
        instance.after_request(after)

        for alias, action in self.__actions.items():
            baction = functools.partial(
                Application.action,
                self,
                action,
                instance,
            )
            bound = baction
            rule = f'/{alias}'
            if action.WILDCARD_ENDPOINT:
                def bound(hash): return baction()
                rule = f'{rule}/<hash>'

            bound.__name__ = alias
            bound.__module__ = action.__module__
            if not instance.debug:
                if action.CONNECTION_LIMIT is not None:
                    limiter = self.extensions['limiter']
                    bound = limiter.limit(action.CONNECTION_LIMIT)(bound)
                if action.CACHE_EXPIRE is not None:
                    cache = self.extensions['cache']
                    bound = cache.cached(action.CACHE_EXPIRE)(bound)

            method = ['GET', 'POST'] if instance.debug else ['POST']

            instance.add_url_rule(view_func=bound, rule=rule, methods=method)
        instance.add_url_rule(
            view_func=lambda: flask.jsonify({}),
            rule='/favicon.ico',
        )


_ = Application(flask.Flask(__name__)).instance
