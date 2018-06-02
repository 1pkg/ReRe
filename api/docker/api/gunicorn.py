bind = ':5000'
preload_app = True

timeout = 10
graceful_timeout = 10
keep_alive = 10

worker_class = 'gthread'
workers = 8
threads = 8
worker_connections = 4096

errorlog = '/var/logs/gunicorn.log'
loglevel = 'error'
