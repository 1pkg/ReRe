class Entry:
    STATUS_SESSION_IDENTIFIED = 'session-identified'
    STATUS_SESSION_PROCESS = 'session-process'
    STATUS_RESULT_CORRECT = 'result-correct'
    STATUS_RESULT_FAIL = 'result-fail'

    def __init__(self, data=None):
        if (data is not None):
            data['timestamp'] = float(data['timestamp'])
            data['taskId'] = int(data['taskId'])
            data['orderNumber'] = int(data['orderNumber'])
            self.__dict__.update(data)
        else:
            data = {}

    def identify(self):
        self.status = Entry.STATUS_SESSION_IDENTIFIED
        self.timestamp = 0
        self.taskId = 0
        self.orderNumber = 0

    def chose(self, result):
        self.status = \
            Entry.STATUS_RESULT_CORRECT \
            if result else \
            Entry.STATUS_RESULT_FAIL
        self.timestamp = 0
        self.taskId = 0

    def fetch(self, taskId, timestamp):
        self.status = Entry.STATUS_SESSION_PROCESS
        self.timestamp = float(timestamp)
        self.taskId = int(taskId)
        self.orderNumber = self.orderNumber + 1

    def skip(self):
        self.status = Entry.STATUS_SESSION_IDENTIFIED
        self.timestamp = 0
        self.taskId = 0

    def get(self):
        return self.__dict__

    def __getattr__(self, name):
        if (name in self.__dict__):
            return self.__dict__[name]
        return None

    def __setattr__(self, name, value):
        self.__dict__[name] = value
