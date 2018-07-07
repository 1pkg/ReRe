#!/bin/sh

flask sync-settings
flask sync-effects
flask sync-targets

cd ./source
exec gunicorn -c /etc/gunicorn.py application:_