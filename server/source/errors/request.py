from base import Error


class Request(Error):
    def __init__(self, param):
        super().__init__(400, param)
