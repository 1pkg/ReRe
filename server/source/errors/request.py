import base

class Request(base.Error):
    def __init__(self, message = ''):
        super().__init__(400, message)
