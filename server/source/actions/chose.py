import base
import helpers

class Chose(base.Action):
    def __init__(self, act, task):
        self.__act = act
        self.__task = task

    def _process(self, request):
        identifier = helpers.Request.getParam(request, 'identifier')
        if (identifier == None):
            raise Exception()

        option = helpers.Request.getParam(request, 'option')
        entry = self.__act.get(identifier)
        task = self.__task.fetchByIdWithSubjectOption(entry['task'])
        result = option == task['option']
        self.__act.chose(identifier, result)
        
        return {
            'option': task['option'],
            'result': result,
        }
