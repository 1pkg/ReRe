FROM redis:stretch

RUN apt-get update
RUN apt-get install -y gettext-base
RUN apt-get purge -y --auto-remove

ARG REDIS_PASSWORD
COPY ./redis.conf /etc/redis/
RUN envsubst '$$REDIS_PASSWORD' < /etc/redis/redis.conf > /etc/redis/redis.conf

CMD /etc/redis/entry.sh