import os
import datetime
import logging
import shutil
from threading import Thread

import targets
from base import Constants, Formatter, Target
from keepers import Json, Sqlite
from fetchers import Image, Wiki


def initialize(session):
    if os.path.exists(Constants.DUMP_PATH):
        shutil.rmtree(Constants.DUMP_PATH)

    if os.path.exists(Constants.LOG_PATH):
        shutil.rmtree(Constants.LOG_PATH)

    if not os.path.exists(Constants.DUMP_PATH):
        os.makedirs(Constants.DUMP_PATH)

    if not os.path.exists(os.path.join(Constants.DUMP_PATH, 'images')):
        os.makedirs(os.path.join(Constants.DUMP_PATH, 'images'))

    if not os.path.exists(Constants.LOG_PATH):
        os.makedirs(Constants.LOG_PATH)
    os.makedirs(os.path.join(Constants.LOG_PATH, session))


def run(session, name, target):
    sqliteKeeper = Sqlite(
        session,
        os.path.join(Constants.DUMP_PATH, 'targets.db'),
    )
    jsonKeeper = Json(
        session,
        os.path.join(Constants.DUMP_PATH, '{0}.json'.format(name)),
    )

    handler = logging.FileHandler(
        os.path.join(Constants.LOG_PATH, session, '{0}.log'.format(name))
    )
    formatter = Formatter(Formatter.BASE_FORMAT, Formatter.TIME_FORMAT)
    handler.setFormatter(formatter)
    logger = logging.getLogger(name)
    logger.setLevel(logging.DEBUG)
    logger.addHandler(handler)

    target(
        Image(logger),
        Wiki(logger),
        logger,
        [sqliteKeeper, jsonKeeper]
    ).process()


session = str(datetime.datetime.today().timestamp())
initialize(session)
for name, target in targets.__dict__.items():
    if isinstance(target, type) and issubclass(target, Target):
        Thread(target=run, args=(session, name, target)).start()
