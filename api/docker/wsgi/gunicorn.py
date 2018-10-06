from os import environ

bind = ':55555'
preload_app = True

proxy_protocol = True
proxy_allow_ips = environ['HTTP_IP_WHITE_LIST']

timeout = 10
graceful_timeout = 10
keep_alive = 10

worker_class = 'gthread'
workers = 8
threads = 8
worker_connections = 4096

errorlog = '/var/logs/wsgi.log'
loglevel = 'error'
