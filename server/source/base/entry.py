class Entry:
    STATUS_SESSION_IDENTIFIED = 'session-identified'
    STATUS_SESSION_PROCESS = 'session-process'
    STATUS_RESULT_CORRECT = 'result-correct'
    STATUS_RESULT_FAIL = 'result-fail'

    def __init__(self, data):
        self.__dict__.update(self.normalize(data))

    @staticmethod
    def normalize(data):
        if (data is None):
            data = {}

        if ('status' not in data):
            data['status'] = Entry.STATUS_SESSION_IDENTIFIED

        if ('taskId' in data):
            data['taskId'] = int(data['taskId'])
        else:
            data['taskId'] = None

        if ('orderNumber' in data):
            data['orderNumber'] = int(data['orderNumber'])
        else:
            data['orderNumber'] = 0

        return data

    def chose(self, result):
        self.status = \
            Entry.STATUS_RESULT_CORRECT \
            if result else \
            Entry.STATUS_RESULT_FAIL

    def fetch(self, taskId):
        self.status = Entry.STATUS_SESSION_PROCESS
        self.taskId = int(taskId)
        self.orderNumber = self.orderNumber + 1

    def skip(self):
        self.status = Entry.STATUS_SESSION_IDENTIFIED
        self.taskId = None

    def get(self):
        return self.__dict__

    def __getattr__(self, name):
        if (name in self.__dict__):
            return self.__dict__[name]
        return None

    def __setattr__(self, name, value):
        self.__dict__[name] = value
