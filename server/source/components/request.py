import socket

import base

class Request(base.Component):
    def getParam(self, request, key, default = None):
        if (key in request.args):
            return request.values[key]
        return default

    def getClientHost(self, request):
        return request.headers['HOST']

    def getClientUserAgent(self, request):
        return request.headers['USER-AGENT']

    def getClientIp(self, request):
        if (request.headers.get('HTTP_X_FORWARDED_FOR')):
            for varip in request.headers.get('HTTP_X_FORWARDED_FOR').split(','):
                if (self.__checkUserIp(varip)):
                    return varip
        elif (self.__checkUserIp(request.headers.get('HTTP_CLIENT_IP'))):
            return request.headers.get('HTTP_CLIENT_IP');
        elif (self.__checkUserIp(request.headers.get('HTTP_X_FORWARDED'))):
            return request.headers.get('HTTP_X_FORWARDED');
        elif (self.__checkUserIp(request.headers.get('HTTP_X_CLUSTER_CLIENT_IP'))):
            return request.headers.get('HTTP_X_CLUSTER_CLIENT_IP');
        elif (self.__checkUserIp(request.headers.get('HTTP_FORWARDED_FOR'))):
            return request.headers.get('HTTP_FORWARDED_FOR');
        elif (self.__checkUserIp(request.headers.get('HTTP_FORWARDED'))):
            return request.headers.get('HTTP_FORWARDED');
        elif (self.__checkUserIp(request.headers.get('REMOTE_ADDR'))):
            return request.headers.get('REMOTE_ADDR');
        else:
            return '0.0.0.0';

    def __checkUserIp(self, ip):
        if (ip == None):
            return False
        try:
            socket.inet_aton(ip)
            return True
        except socket.error:
            return False
