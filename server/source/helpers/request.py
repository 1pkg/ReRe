import socket

class Request:
    @staticmethod
    def getParam(request, key, default = None):
        if (key in request.args):
            return request.values[key]
        return default

    @staticmethod
    def getClientHost(request):
        return request.headers['HOST']

    @staticmethod
    def getClientUserAgent(request):
        return request.headers['USER-AGENT']

    @staticmethod
    def getClientIp(request):
        if (request.headers.get('HTTP_X_FORWARDED_FOR')):
            for varip in request.headers.get('HTTP_X_FORWARDED_FOR').split(','):
                if (Request.__checkUserIp(varip)):
                    return varip
        elif (Request.__checkUserIp(request.headers.get('HTTP_CLIENT_IP'))):
            return request.headers.get('HTTP_CLIENT_IP');
        elif (Request.__checkUserIp(request.headers.get('HTTP_X_FORWARDED'))):
            return request.headers.get('HTTP_X_FORWARDED');
        elif (Request.__checkUserIp(request.headers.get('HTTP_X_CLUSTER_CLIENT_IP'))):
            return request.headers.get('HTTP_X_CLUSTER_CLIENT_IP');
        elif (Request.__checkUserIp(request.headers.get('HTTP_FORWARDED_FOR'))):
            return request.headers.get('HTTP_FORWARDED_FOR');
        elif (Request.__checkUserIp(request.headers.get('HTTP_FORWARDED'))):
            return request.headers.get('HTTP_FORWARDED');
        elif (Request.__checkUserIp(request.headers.get('REMOTE_ADDR'))):
            return request.headers.get('REMOTE_ADDR');
        else:
            return '0.0.0.0';

    @staticmethod
    def __checkUserIp(ip):
        if (ip == None):
            return False
        try:
            socket.inet_aton(ip)
            return True
        except socket.error:
            return False
