FROM python

WORKDIR /var/rectio

COPY ./source ./source
COPY ./settings ./settings
COPY ./requirements.txt ./requirements.txt

RUN pip install virtualenv
RUN virtualenv env
RUN . ./env/bin/activate
RUN pip install -r requirements.txt
RUN pip install gunicorn

ENV FLASK_APP ./source/application.py
ENV FLASK_SETTING ./../settings/production.cfg

RUN groupadd -r api-user
RUN useradd -rmg api-user api-user
RUN chown -R api-user:api-user ./

COPY ./docker/api/gunicorn.py /etc/gunicorn.py

USER api-user
WORKDIR ./source
CMD gunicorn -c /etc/gunicorn.py application:_
