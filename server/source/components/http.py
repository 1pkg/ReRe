import socket

from base import Component


class Http(Component):
    def userHost(self, request):
        return request.headers['HOST']

    def userAgent(self, request):
        return request.headers['USER-AGENT']

    def userIp(self, request):
        headers = request.headers
        if headers.get('HTTP_X_FORWARDED_FOR'):
            forward = headers.get('HTTP_X_FORWARDED_FOR').split(',')
            for varip in forward:
                if self.__checkUserIp(varip):
                    return varip
        elif self.__checkUserIp(headers.get('HTTP_CLIENT_IP')):
            return headers.get('HTTP_CLIENT_IP')
        elif self.__checkUserIp(headers.get('HTTP_X_FORWARDED')):
            return headers.get('HTTP_X_FORWARDED')
        elif self.__checkUserIp(headers.get('HTTP_X_CLUSTER_CLIENT_IP')):
            return headers.get('HTTP_X_CLUSTER_CLIENT_IP')
        elif self.__checkUserIp(headers.get('HTTP_FORWARDED_FOR')):
            return headers.get('HTTP_FORWARDED_FOR')
        elif self.__checkUserIp(headers.get('HTTP_FORWARDED')):
            return headers.get('HTTP_FORWARDED')
        elif self.__checkUserIp(headers.get('REMOTE_ADDR')):
            return headers.get('REMOTE_ADDR')
        else:
            return request.remote_addr

    def __checkUserIp(self, ip):
        if ip is None:
            return False

        try:
            socket.inet_aton(ip)
            return True
        except socket.error:
            return False
