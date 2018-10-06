#!/bin/sh

flask sync-settings
flask sync-effects
flask sync-targets

flask generate --count 1000
flask advertise --count 100

cd ./source
exec gunicorn -c ./../gunicorn.py application:_