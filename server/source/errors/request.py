import base

class Request(base.Error):
    def __init__(self, param):
        super().__init__(400, param)
