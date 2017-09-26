from ..error import *

class Request(Error):
    def __init__(self, message = ''):
        super().__init__(400, message)
