#!/bin/sh

if [ ! -f /etc/nginx/certificate/dhparams.pem ]; then
    openssl dhparam -out /etc/nginx/certificate/dhparams.pem 2048
    chmod 600 /etc/nginx/certificate/dhparams.pem
fi

(
 sleep 15 &
 while :
 do

    rm /etc/nginx/conf.d/*
    envsubst '$$HOST' < /etc/nginx/templates/challenge.conf > /etc/nginx/conf.d/challenge.conf
    nginx -s reload

    /etc/nginx/scripts/letsencrypt.sh

    rm /etc/nginx/conf.d/*
    envsubst '$$HOST' < /etc/nginx/templates/client.conf > /etc/nginx/conf.d/client.conf
    envsubst '$$HOST, $$API_HOST' < /etc/nginx/templates/api.conf > /etc/nginx/conf.d/api.conf
    envsubst '$$HOST, $$LOOK_UP_HOST' < /etc/nginx/templates/lookup.conf > /etc/nginx/conf.d/lookup.conf
    envsubst '$$HOST' < /etc/nginx/templates/_deny.conf > /etc/nginx/conf.d/_deny.conf
    nginx -s reload

    sleep 30d
 done
) &

nginx