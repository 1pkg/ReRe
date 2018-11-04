FROM python:3

RUN apt-get update
RUN apt-get install -y gettext-base
RUN apt-get purge -y --auto-remove

WORKDIR /var/www/wsgi

COPY ./source ./source
COPY ./settings ./settings
COPY ./effects ./effects
COPY ./requirements.txt ./

RUN python3 -m venv env
RUN . ./env/bin/activate
RUN pip install -r requirements.txt
RUN pip install gunicorn

ENV FLASK_APP ./source/application.py
ENV FLASK_SETTING ./../settings/production.cfg

ARG API_INITIALIZE_MODE
COPY ./docker/wsgi/gunicorn.py ./
COPY ./docker/wsgi/$API_INITIALIZE_MODE.sh ./entry.sh
RUN chmod +x ./entry.sh

RUN groupadd -r wsgi-user
RUN useradd -rmg wsgi-user wsgi-user
RUN chown -R wsgi-user:wsgi-user ./

USER wsgi-user
CMD ./entry.sh