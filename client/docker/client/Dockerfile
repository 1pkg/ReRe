FROM nginx

WORKDIR /var

RUN groupadd -r nginx-user
RUN useradd -rmg nginx-user nginx-user

COPY ./dump/build ./rectio
RUN chown -R nginx-user:nginx-user ./rectio

RUN rm -r /etc/nginx/conf.d/*
COPY ./docker/client/nginx.conf /etc/nginx/
COPY ./docker/client/rectio.conf /etc/nginx/conf.d/
COPY ./docker/client/ssl/certificate.crt /etc/nginx/ssl/
COPY ./docker/client/ssl/certificate.key /etc/nginx/ssl/

CMD nginx
EXPOSE 80
EXPOSE 443
