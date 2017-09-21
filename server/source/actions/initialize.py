import base
import helpers

class Initialize(base.Action):
    def __init__(self, act, assist):
        self.__act = act
        self.__assist = assist

    def _process(self, request):
        identifier = helpers.Request.getParam(request, 'identifier')
        if (identifier == None):
            raise Exception()

        assists = self.__assist.fetchByRandom(3)
        self.__act.initialalize(identifier, assists)

        return {
            'identifier': identifier,
            'assists': assists,
        }
