#!/bin/sh

(
 sleep 30 &
 while :
 do
    /etc/nginx/scripts/letsencrypt.sh

    rm /etc/nginx/conf.d/*
    envsubst '$$HOST, $$LOOK_UP_HOST' < /etc/nginx/templates/lookup.conf > /etc/nginx/conf.d/lookup.conf
    envsubst '$$HOST, $$API_HOST' < /etc/nginx/templates/api.conf > /etc/nginx/conf.d/api.conf
    envsubst '$$HOST' < /etc/nginx/templates/client.conf > /etc/nginx/conf.d/client.conf
    envsubst '$$HOST' < /etc/nginx/templates/_deny.conf > /etc/nginx/conf.d/_deny.conf
    nginx -s reload

    sleep 30d
 done
) &

nginx