FROM redis

WORKDIR /var

RUN groupadd -r redis-user
RUN useradd -rmg redis-user redis-user

RUN mkdir -p ./logs
RUN chown -R redis-user:redis-user ./logs
VOLUME ./logs

COPY ./redis.conf /usr/local/etc/redis/

USER redis-user
CMD redis-server /usr/local/etc/redis/redis.conf