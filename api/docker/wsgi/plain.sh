#!/bin/sh

cd ./source
exec gunicorn -c ./../gunicorn.py application:_ -k gevent