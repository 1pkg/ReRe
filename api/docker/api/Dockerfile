FROM python

WORKDIR /var/rectio

COPY ./source ./source
COPY ./settings ./settings
COPY ./effects ./effects
COPY ./requirements.txt ./

RUN pip install virtualenv
RUN virtualenv env
RUN . ./env/bin/activate
RUN pip install -r requirements.txt
RUN pip install gunicorn

ENV FLASK_APP ./source/application.py
ENV FLASK_SETTING ./../settings/production.cfg

COPY ./docker/api/gunicorn.py /etc/
COPY ./docker/api/entry.sh ./
RUN chmod +x ./entry.sh

RUN groupadd -r api-user
RUN useradd -rmg api-user api-user
RUN chown -R api-user:api-user ./

USER api-user
CMD ./entry.sh
