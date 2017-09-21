import psycopg2.extras

from .service import *

class DbService(Service):
    def __init__(self, connection):
        self.__connection = connection
        self.__cursor = None

    def _fetch(self, query, params):
        self.__open()
        self.__cursor.execute(query, params)
        data = self.__cursor.fetchall()
        self.__close()
        return data

    def _execute(self, query, params, result = False, close = True):
        self.__open(psycopg2.extras.NamedTupleCursor)
        self.__open()
        self.__cursor.execute(query, params)
        data = None
        if (result):
            data = self.__cursor.fetchone()[0]
        if (close):
            self.__close()
        return data

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
