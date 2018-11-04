FROM postgres:11

RUN apt-get update
RUN apt-get install -y gettext-base
RUN apt-get purge -y --auto-remove

COPY ./pgsql.conf /etc/postgresql/

ARG DB_MEMORY_LIMIT
ARG SHARED_BUFFERS_MEMORY
ARG EFFECTIVE_CACHE_SIZE_MEMORY
ARG MAINTANCE_WORK_MEMORY
ARG WORK_MEMORY
COPY ./pgsql.conf /etc/postgresql/
RUN envsubst '$$SHARED_BUFFERS_MEMORY, $$EFFECTIVE_CACHE_SIZE_MEMORY, $$MAINTANCE_WORK_MEMORY, $$WORK_MEMORY' < /etc/postgresql/pgsql.conf > /etc/postgresql/pgsql.conf