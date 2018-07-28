from base import Error


class Integrity(Error):
    def __init__(self, integrity):
        super().__init__(401, f'bad integrity {integrity}')
