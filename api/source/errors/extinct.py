from base import Error


class Extinct(Error):
    def __init__(self, subject):
        super().__init__(403, f'subject {subject} not exists')
