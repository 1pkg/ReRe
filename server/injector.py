import psycopg2
import redis

import base
import providers
import actions

class Injector:
    def __init__(self, configs):
        self.__providers = {};
        self.__pool = {};
        if (configs['DB_CONNECTTION'] and configs['REDIS_CONNECTTION']):
            dbConnection = psycopg2.connect(
                'host=%s dbname=%s user=%s password=%s' % \
                 (
                    configs['DB_CONNECTTION']['host'],
                    configs['DB_CONNECTTION']['dbname'],
                    configs['DB_CONNECTTION']['user'],
                    configs['DB_CONNECTTION']['password'],
                )
            )
            redisConnection = redis.StrictRedis(
                host=configs['REDIS_CONNECTTION']['host'],
                port=configs['REDIS_CONNECTTION']['port'],
                db=configs['REDIS_CONNECTTION']['db']
            )
            self.__providers['request'] = base.RequestProvider()
            self.__providers['act'] = providers.Act(redisConnection, self.__providers['request'])
            self.__providers['task'] = providers.Task(dbConnection)
            self.__providers['option'] = providers.Option(dbConnection)
            self.__providers['reference'] = providers.Reference(dbConnection)
            self.__providers['subject'] = providers.Subject(dbConnection)
        else:
            pass

    def register(self, pool):
        pool['fetch-task'] = actions.FetchTask(
            self.__providers['act'],
            self.__providers['task'],
            self.__providers['option'],
            self.__providers['reference'],
            self.__providers['subject']
        )

        pool['option-chose'] = actions.OptionChose(
            self.__providers['act']
        )
