from base import Error


class Integrity(Error):
    def __init__(self):
        super().__init__(401, 'integrity isn\'t valid')
