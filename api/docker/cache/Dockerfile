FROM redis:stretch

RUN apt-get update
RUN apt-get install -y gettext-base
RUN apt-get purge -y --auto-remove

ARG CACHE_PASSWORD
ARG CACHE_MEMORY_LIMIT
COPY ./redis.conf /etc/redis/
RUN envsubst '$$CACHE_PASSWORD, $$CACHE_MEMORY_LIMIT' < /etc/redis/redis.conf > /etc/redis/redis.conf
