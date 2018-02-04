from base import Error


class Status(Error):
    def __init__(self):
        super().__init__(403, 'status not suits')
