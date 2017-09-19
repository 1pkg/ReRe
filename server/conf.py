class Config:
    SERVER_NAME = None
    SECRET_KEY = None
    DEBUG = False
    TESTING = False
    JSON_AS_ASCII = False
    USE_X_SENDFILE = False
    LOGGER_NAME = ''
    LOGGER_HANDLER_POLICY = 'always'

class Production(Config):
    DB_CONNECTTION = {'host': 'localhost', 'dbname': 'wit', 'user': 'postgres', 'password': '123'}
    REDIS_CONNECTTION = {'host': 'localhost', 'port': 6379, 'db': 0}

class Development(Config):
    DB_CONNECTTION = {'host': 'localhost', 'dbname': 'wit', 'user': 'postgres', 'password': '123'}
    REDIS_CONNECTTION = {'host': 'localhost', 'port': 6379, 'db': 0}
    DEBUG = True

class Testing(Config):
    TESTING = True
