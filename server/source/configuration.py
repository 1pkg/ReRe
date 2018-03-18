class Configuration:
    SERVER_NAME = None
    SECRET_KEY = None
    DEBUG = False
    TESTING = False
    JSON_AS_ASCII = False
    USE_X_SENDFILE = False
    LOGGER_NAME = ''
    SQLALCHEMY_TRACK_MODIFICATIONS = True
    LOGGER_HANDLER_POLICY = 'always'
    TRAP_HTTP_EXCEPTIONS = True

    RATELIMIT_DEFAULT = '100 per minute'
    RATELIMIT_STRATEGY = 'moving-window'


class Production(Configuration):
    SQLALCHEMY_DATABASE_URI = 'postgresql://default:@localhost/test'


class Development(Configuration):
    SQLALCHEMY_DATABASE_URI = 'postgresql://default:@localhost/test'
    DEBUG = True


class Testing(Configuration):
    SQLALCHEMY_DATABASE_URI = 'sqlite://:memory'
    TESTING = True
