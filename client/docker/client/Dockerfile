FROM nginx

WORKDIR /var

RUN groupadd -r nginx-user
RUN useradd -rmg nginx-user nginx-user

COPY ./dump/build ./rectio
RUN chown -R nginx-user:nginx-user ./rectio

RUN mkdir -p ./images
RUN chown -R nginx-user:nginx-user ./images
VOLUME ./images

RUN mkdir -p ./logs
RUN chown -R nginx-user:nginx-user ./logs
VOLUME ./logs

RUN rm -r /etc/nginx/conf.d/*
COPY ./docker/client/nginx.conf /etc/nginx/
COPY ./docker/client/rectio.conf /etc/nginx/conf.d/

CMD nginx
EXPOSE 80
