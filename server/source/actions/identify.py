import random
import hashlib

import base
import errors
import constants

class Identify(base.Action):
    def __init__(self, entry):
        self._entry = entry

    def _process(self, request):
        identifier = self._get(request, 'identifier')

        if (identifier == None or self._entry.get(identifier) == None):
            identifier = self.__getClientIdentifier(request)

        self._entry.identify(identifier)

        return {
            'identifier': identifier,
        }

    def __getClientIdentifier(self, request):
        hash = hashlib.md5()
        hash.update(request.headers['HOST'].encode('utf-8'))
        hash.update(request.headers['USER-AGENT'].encode('utf-8'))
        hash.update(self.__getClientIp(request).encode('utf-8'))
        hash.update(str(random.getrandbits(32)).encode('utf-8'))
        identifier = hash.hexdigest()

        return identifier

    def __getClientIp(self, request):
        if (request.headers.get('HTTP_X_FORWARDED_FOR')):
            for varip in request.headers.get('HTTP_X_FORWARDED_FOR').split(','):
                if (self.__checkClientIp(varip)): return varip
        elif (self.__checkClientIp(request.headers.get('HTTP_CLIENT_IP'))):
            return request.headers.get('HTTP_CLIENT_IP');
        elif (self.__checkClientIp(request.headers.get('HTTP_X_FORWARDED'))):
            return request.headers.get('HTTP_X_FORWARDED');
        elif (self.__checkClientIp(request.headers.get('HTTP_X_CLUSTER_CLIENT_IP'))):
            return request.headers.get('HTTP_X_CLUSTER_CLIENT_IP');
        elif (self.__checkClientIp(request.headers.get('HTTP_FORWARDED_FOR'))):
            return request.headers.get('HTTP_FORWARDED_FOR');
        elif (self.__checkClientIp(request.headers.get('HTTP_FORWARDED'))):
            return request.headers.get('HTTP_FORWARDED');
        elif (self.__checkClientIp(request.headers.get('REMOTE_ADDR'))):
            return request.headers.get('REMOTE_ADDR');
        else:
            return '0.0.0.0';

    def __checkClientIp(self, ip):
        if (ip == None): return False
        try:
            socket.inet_aton(ip)
            return True
        except socket.error:
            return False
