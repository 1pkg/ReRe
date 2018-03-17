from base import Error


class Token(Error):
    def __init__(self):
        super().__init__(403, 'token not exists or not correct')
