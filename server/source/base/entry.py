class Entry:
    def __init__(self, data):
        self.__dict__.update(self.normalize(data))

    @staticmethod
    def normalize(data):
        if (data is None):
            data = {}

        if ('status' not in data):
            data['status'] = 'session-identified'

        if ('taskId' in data):
            data['taskId'] = int(data['taskId'])
        else:
            data['taskId'] = 0

        if ('orderNumber' in data):
            data['orderNumber'] = int(data['orderNumber'])
        else:
            data['orderNumber'] = 0

        return data

    def chose(self, application, result):
        self.status = \
            application.STATUS_RESULT_CORRECT \
            if result else \
            application.STATUS_RESULT_FAIL

    def fetch(self, application, taskId):
        self.status = application.STATUS_SESSION_PROCESS
        self.taskId = taskId
        self.orderNumber = self.orderNumber + 1

    def get(self):
        return self.__dict__

    def __getattr__(self, name):
        if (name in self.__dict__):
            return self.__dict__[name]
        return None

    def __setattr__(self, name, value):
        self.__dict__[name] = value
