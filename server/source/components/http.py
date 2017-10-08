import socket

class Http:
    def clientHost(self, request):
        return request.headers['HOST']

    def clientUserAgent(self, request):
        return request.headers['USER-AGENT']

    def clientIp(self, request):
        if (request.headers.get('HTTP_X_FORWARDED_FOR')):
            for varip in request.headers.get('HTTP_X_FORWARDED_FOR').split(','):
                if (self.__checkClientIp(varip)):
                    return varip
        elif (self.__checkClientIp(request.headers.get('HTTP_CLIENT_IP'))):
            return request.headers.get('HTTP_CLIENT_IP')
        elif (self.__checkClientIp(request.headers.get('HTTP_X_FORWARDED'))):
            return request.headers.get('HTTP_X_FORWARDED')
        elif (self.__checkClientIp(request.headers.get('HTTP_X_CLUSTER_CLIENT_IP'))):
            return request.headers.get('HTTP_X_CLUSTER_CLIENT_IP')
        elif (self.__checkClientIp(request.headers.get('HTTP_FORWARDED_FOR'))):
            return request.headers.get('HTTP_FORWARDED_FOR')
        elif (self.__checkClientIp(request.headers.get('HTTP_FORWARDED'))):
            return request.headers.get('HTTP_FORWARDED')
        elif (self.__checkClientIp(request.headers.get('REMOTE_ADDR'))):
            return request.headers.get('REMOTE_ADDR')
        else:
            return '0.0.0.0'

    def __checkClientIp(self, ip):
        if (ip == None):
            return False
        try:
            socket.inet_aton(ip)
            return True
        except socket.error:
            return False
