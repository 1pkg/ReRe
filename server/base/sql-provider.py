import psycopg2.extras

from provider import *

class SqlProvider(Provider):
    def __init__(self, connection):
        self.__connection = connection
        self.__cursor = None

    def _fetch(self, query, params):
        self.__open()
        self.__cursor.execute(query, params)
        data = self.__cursor.fetchall()
        self.__close()
        return data

    def _push(self, query, params, close = True):
        self.__open(psycopg2.extras.NamedTupleCursor)
        self.__cursor.execute(query, params)
        data = self.__cursor.fetchone()
        if (close):
            self.__close()
        return data[0]

    def _execute(self, query, params, close = True):
        with self.__connection:
            self.__open()
            self.__cursor.execute(query, params)
            if (close):
                self.__close()

    def _commit(self):
        self.__close()

    def __open(self, factory = psycopg2.extras.RealDictCursor):
        if (self.__cursor == None):
            self.__cursor = self.__connection.cursor(cursor_factory = factory)

    def __close(self):
        if (self.__cursor != None):
            self.__connection.commit()
            self.__cursor.close()
            self.__cursor = None
