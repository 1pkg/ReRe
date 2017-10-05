import base

class Identifier(base.Error):
    def __init__(self):
        super().__init__(403, 'identifier not exists or not correct')
