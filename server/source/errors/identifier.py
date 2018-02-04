from base import Error


class Identifier(Error):
    def __init__(self):
        super().__init__(403, 'identifier not exists or not correct')
