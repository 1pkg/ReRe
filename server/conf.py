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
    CONNECTTION = "host='localhost' dbname='wit' user='postgres' password='123'"

class Development(Config):
    CONNECTTION = "host='localhost' dbname='wit' user='postgres' password='123'"
    DEBUG = True

class Testing(Config):
    TESTING = True
