from base import Error


class Request(Error):
    def __init__(self, param, value):
        super().__init__(400, f'bad param {param} value {value}')
