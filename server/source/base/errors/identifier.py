from ..error import *

class Identifier(Error):
    def __init__(self):
        super().__init__(403, 'identifier not exists')
