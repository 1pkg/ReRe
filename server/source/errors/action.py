from base import Error


class Action(Error):
    def __init__(self):
        super().__init__(404, 'action not exists or not correct')
