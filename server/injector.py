import psycopg2

import providers
import actions

class Injector:
    def __init__(self, configs):
        self.__providers = {};
        self.__pool = {};
        if (configs['CONNECTTION']):
            connection = psycopg2.connect(configs['CONNECTTION'])
            self.__providers['task'] = providers.Task(connection)
            self.__providers['option'] = providers.Option(connection)
            self.__providers['reference'] = providers.Reference(connection)
            self.__providers['subject'] = providers.Subject(connection)
        else:
            pass

    def register(self, pool):
        pool['fetch-task'] = actions.FetchTask(
            self.__providers['task'],
            self.__providers['option'],
            self.__providers['reference'],
            self.__providers['subject']
        )
