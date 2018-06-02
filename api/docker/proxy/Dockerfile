FROM nginx

WORKDIR /var

RUN groupadd -r nginx-user
RUN useradd -rmg nginx-user nginx-user

RUN mkdir -p ./logs
RUN chown -R nginx-user:nginx-user ./logs
VOLUME ./logs

RUN rm -r /etc/nginx/conf.d/*
COPY ./nginx.conf /etc/nginx/
COPY ./rectio.conf /etc/nginx/conf.d/

CMD nginx
EXPOSE 80
