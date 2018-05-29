FROM nginx

RUN apt-get update -y && apt-get upgrade -y 

ADD nginx.conf /etc/nginx/
RUN rm -rf /etc/nginx/conf.d/*
ADD rectio.conf /etc/nginx/conf.d/

RUN groupadd -r nginx-user
RUN useradd -r -m -g nginx-user nginx-user
RUN mkdir -p /var/www/rectio
RUN chown -R nginx-user:nginx-user /var/www/rectio
VOLUME /var/www/rectio

CMD nginx
EXPOSE 80
