from ..error import *

class Empty(Error):
    def __init__(self):
        super().__init__(404, 'empty action')
