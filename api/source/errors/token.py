from base import Error


class Token(Error):
    def __init__(self, token):
        super().__init__(403, f'token {token} has been expired')
