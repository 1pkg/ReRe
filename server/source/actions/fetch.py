import random

import base
import helpers

class Fetch(base.Action):
    def __init__(self, act, task, option, reference, subject):
        self.__act = act
        self.__task = task
        self.__option = option
        self.__reference = reference
        self.__subject = subject

    def _process(self, request):
        identifier = helpers.Request.getParam(request, 'identifier')
        if (identifier == None):
            raise Exception()

        return self.__createhRandomTask(request)

    def __createhRandomTask(self, request):
        task = {}
        options = self.__option.fetchByRandom(3)
        for option in options:
            option['references'] = self.__reference.fetchByRandomOptionId(option['id'], 3)
        index = random.randint(0, len(options) - 1)
        subject = self.__subject.fetchByRandomOptionId(options[index]['id'])

        identifier = helpers.Request.getParam(request, 'identifier')
        id = self.__task.push(subject['id'], [option['id'] for option in options])
        self.__act.fetch(identifier, id)

        return {
            'options': options,
            'subject': subject,
        }
