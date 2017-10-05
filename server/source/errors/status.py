import base

class Status(base.Error):
    def __init__(self):
        super().__init__(403, 'status not suits')
