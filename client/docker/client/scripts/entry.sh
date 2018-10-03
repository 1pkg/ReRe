#!/bin/sh

if [ ! -f /etc/nginx/certificate/dhparams.pem ]; then
    openssl dhparam -out /etc/nginx/certificate/dhparams.pem 2048
    chmod 600 /etc/nginx/certificate/dhparams.pem
fi

(
 sleep 15 &
 while :
 do
    /etc/nginx/scripts/letsencrypt.sh
    envsubst '$$HOST' < /etc/nginx/conf.template/client.conf > /etc/nginx/conf.d/client.conf
    envsubst '$$HOST, $$API_HOST' < /etc/nginx/conf.template/api.conf > /etc/nginx/conf.d/api.conf
    envsubst '$$HOST' < /etc/nginx/conf.template/_deny.conf > /etc/nginx/conf.d/_deny.conf

    nginx -s reload
    sleep 30d
 done
) &

nginx