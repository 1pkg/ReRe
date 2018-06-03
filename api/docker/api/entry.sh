#!/bin/sh

flask sync-settings
flask sync-effects
flask generate

cd ./source
exec gunicorn -c /etc/gunicorn.py application:_