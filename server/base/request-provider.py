import flask
import socket

from .provider import *

class RequestProvider(Provider):
    def getClientHost(self):
        return flask.request.headers.get('Host')

    def getClientUserAgent(self):
        return flask.request.headers.get('USER-AGENT')

    def getClientIp(self):
        if (flask.request.headers.get('HTTP_X_FORWARDED_FOR')):
            for varip in flask.request.headers.get('HTTP_X_FORWARDED_FOR').split(','):
                if (self.__checkUserIp(varip)):
                    return varip
        elif (self.__checkUserIp(flask.request.headers.get('HTTP_CLIENT_IP'))):
            return flask.request.headers.get('HTTP_CLIENT_IP');
        elif (self.__checkUserIp(flask.request.headers.get('HTTP_X_FORWARDED'))):
            return flask.request.headers.get('HTTP_X_FORWARDED');
        elif (self.__checkUserIp(flask.request.headers.get('HTTP_X_CLUSTER_CLIENT_IP'))):
            return flask.request.headers.get('HTTP_X_CLUSTER_CLIENT_IP');
        elif (self.__checkUserIp(flask.request.headers.get('HTTP_FORWARDED_FOR'))):
            return flask.request.headers.get('HTTP_FORWARDED_FOR');
        elif (self.__checkUserIp(flask.request.headers.get('HTTP_FORWARDED'))):
            return flask.request.headers.get('HTTP_FORWARDED');
        elif (self.__checkUserIp(flask.request.headers.get('REMOTE_ADDR'))):
            return flask.request.headers.get('REMOTE_ADDR');
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
