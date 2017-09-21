import base
import helpers

class Start(base.Action):
    def __init__(self, act):
        self.__act = act

    def _process(self, request):
        identifier = helpers.Request.getParam(request, 'identifier')
        if (identifier == None):
            identifier = helpers.Hash.getClientIdentifier(
                'salt',
                helpers.Request.getClientHost(request),
                helpers.Request.getClientUserAgent(request),
                helpers.Request.getClientIp(request)
            )
            
        self.__act.start(identifier)

        return {
            'identifier': identifier,
        }
