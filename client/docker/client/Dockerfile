FROM nginx:stable

RUN apt-get update
RUN apt-get install -y gettext-base certbot openssl
RUN apt-get purge -y --auto-remove

WORKDIR /var/www
COPY ./dump/build ./client

RUN groupadd -r nginx-user
RUN useradd -rmg nginx-user nginx-user

COPY ./dump/build ./client

RUN rm -r /etc/nginx/conf.d/*
COPY ./docker/client/nginx.conf /etc/nginx/
COPY ./docker/client/servers/client.conf /etc/nginx/conf.template/
COPY ./docker/client/servers/_deny.conf /etc/nginx/conf.template/

ARG HOST
COPY ./docker/client/servers/challenge.conf /etc/nginx/conf.d/
RUN envsubst '$$HOST' < /etc/nginx/conf.d/challenge.conf > /etc/nginx/conf.d/challenge.conf

COPY ./docker/client/scripts/* /etc/nginx/scripts/
RUN chmod +x /etc/nginx/scripts/*

EXPOSE 80
EXPOSE 443
CMD /etc/nginx/scripts/entry.sh