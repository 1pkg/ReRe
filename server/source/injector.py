import psycopg2
import redis

import base
import services
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
            self.__providers['act'] = services.Act(redisConnection)
            self.__providers['task'] = services.Task(dbConnection)
            self.__providers['option'] = services.Option(dbConnection)
            self.__providers['reference'] = services.Reference(dbConnection)
            self.__providers['subject'] = services.Subject(dbConnection)
            self.__providers['assist'] = services.Assist(dbConnection)
        else:
            pass

    def register(self, pool):
        pool['start'] = actions.Start(
            self.__providers['act'],
        )

        pool['initialalize'] = actions.Initialize(
            self.__providers['act'],
            self.__providers['assist'],
        )

        pool['fetch'] = actions.Fetch(
            self.__providers['act'],
            self.__providers['task'],
            self.__providers['option'],
            self.__providers['reference'],
            self.__providers['subject'],
        )

        pool['chose'] = actions.Chose(
            self.__providers['act'],
            self.__providers['task'],
        )
