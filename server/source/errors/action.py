import base

class Action(base.Error):
    def __init__(self):
        super().__init__(404, 'action not exists')
