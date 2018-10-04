#!/bin/sh

if [ ! -f /etc/nginx/certificate/dhparams.pem ]; then
    openssl dhparam -out /etc/nginx/certificate/dhparams.pem 2048
    chmod 600 /etc/nginx/certificate/dhparams.pem
fi

if [ -f /etc/nginx/certificate/cert.pem ] && openssl x509 -checkend 2592000 -noout -in /etc/nginx/certificate/cert.pem ; then
    return 1
fi

rm /etc/nginx/conf.d/*
envsubst '$$HOST' < /etc/nginx/templates/challenge.conf > /etc/nginx/conf.d/challenge.conf
nginx -s reload

certbot certonly -t -n --agree-tos --renew-by-default --email "${ENCRYPT_EMAIL}" --webroot -w /usr/share/nginx/html -d ${ENCRYPT_DOMAIN}
le_result=$?
if [ $le_result -ne 0 ]; then
    return 1
fi

FIRST_DOMAIN=$(echo "$ENCRYPT_DOMAIN" | cut -d"," -f1)
cp -fv /etc/letsencrypt/live/${FIRST_DOMAIN}/fullchain.pem /etc/nginx/certificate/cert.pem
cp -fv /etc/letsencrypt/live/${FIRST_DOMAIN}/privkey.pem /etc/nginx/certificate/privkey.pem
cp -fv /etc/letsencrypt/live/${FIRST_DOMAIN}/chain.pem /etc/nginx/certificate/chain.pem
return 0