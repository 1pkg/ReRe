class Db:
    def __init__(self, connection):
        self.__connection = connection
        self.__result = None
        self.__cursor = None

    def _fetch(self, query, params=None):
        if (params is None):
            params = {}

        self.__open()
        self.__cursor.execute(query, params)
        data = self.__cursor.fetchall()
        self.__close()
        return data

    def _execute(self, query, params, commit=True):
        self.__open()
        self.__cursor.execute(query, params)
        if (commit):
            if (self.__cursor.description is not None):
                return self.__cursor.fetchone()
            self.__close()
        return None

    def _commit(self):
        self.__close()

    def __open(self):
        if (self.__cursor is None):
            self.__cursor = self.__connection.cursor()

    def __close(self):
        if (self.__cursor is not None):
            self.__connection.commit()
            self.__cursor.close()
            self.__cursor = None
