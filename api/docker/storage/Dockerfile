FROM redis:5

RUN apt-get update
RUN apt-get install -y gettext-base
RUN apt-get purge -y --auto-remove

ARG STORAGE_PASSWORD
COPY ./redis.conf /etc/redis/
RUN envsubst '$$STORAGE_PASSWORD' < /etc/redis/redis.conf > /etc/redis/redis.conf
