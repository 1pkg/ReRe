class Configuration:
    SERVER_NAME = None
    SECRET_KEY = None
    DEBUG = False
    TESTING = False
    JSON_AS_ASCII = False
    USE_X_SENDFILE = False
    LOGGER_NAME = ''
    LOGGER_HANDLER_POLICY = 'always'

class Production(Configuration):
    DB_CONNECTTION = {'host': 'localhost', 'dbname': 'wit', 'user': 'default', 'password': ''}
    REDIS_CONNECTTION = {'host': 'localhost', 'port': 6379, 'db': 0}

class Development(Configuration):
    DB_CONNECTTION = {'host': 'localhost', 'dbname': 'wit', 'user': 'default', 'password': ''}
    REDIS_CONNECTTION = {'host': 'localhost', 'port': 6379, 'db': 0}
    DEBUG = True

class Testing(Configuration):
    TESTING = True
