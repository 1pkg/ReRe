from flask_limiter import util

from base import Component


class Http(Component):
    def userhost(self, request):
        return str(request.headers['HOST'])

    def useragent(self, request):
        return str(request.headers['USER-AGENT'])

    def userip(self, request):
        return str(util.get_remote_address())
