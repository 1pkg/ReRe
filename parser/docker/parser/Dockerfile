FROM python

WORKDIR /var/parser

RUN apt-get update
RUN apt-get install tor -y
COPY ./docker/parser/torrc /etc/tor
RUN service tor start

ENV TOR_CTRL_PASS rectio
ENV PARS_STATIC_PROXY proxy

COPY ./source ./source
COPY ./requirements.txt ./

RUN pip install virtualenv
RUN virtualenv -p python3 env
RUN . ./env/bin/activate
RUN pip install -r requirements.txt

RUN groupadd -r parser-user
RUN useradd -rmg parser-user parser-user
RUN chown -R parser-user:parser-user ./

CMD python3 ./source/main.py --path /var/dump
