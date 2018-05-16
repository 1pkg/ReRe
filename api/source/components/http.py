from flask_limiter import util

from base import Component


class Http(Component):
    def userHost(self, request):
        return request.headers['HOST']

    def userAgent(self, request):
        return request.headers['USER-AGENT']

    def userIp(self, request):
        return util.get_remote_address()
