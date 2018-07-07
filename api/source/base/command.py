class Command:
    ARGUMENTS = []

    def __init__(self, application):
        self._application = application

    def execute(self):
        return NotImplemented
