class Error(Exception):
    def __init__(self, code, message):
        Exception.__init__(self)
        self.__code = code
        self.__message = message

    def __str__(self):
        return 'HTTP error status code: {}, with message {}'.format(self.__code, self.__message)

    def __repr__(self):
        return '{}|{}'.format(self.__code, self.__message)
