from base import Error


class Identity(Error):
    def __init__(self):
        super().__init__(403, 'bad identity')
