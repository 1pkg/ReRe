import os
import datetime
import logging
import shutil
from argparse import ArgumentParser
from threading import Thread

import targets
from base import Formatter, Target
from keepers import Json, Sqlite
from fetchers import IMediator, Wiki

argparser = ArgumentParser(description='Parser')
argparser.add_argument(
    '--session',
    type=str,
    default=str(datetime.datetime.today().timestamp()),
    help='session name for folders structure',
)
argparser.add_argument(
    '--targets',
    nargs='*',
    default=[],
    help='max count of fetch try on various errors',
)
argparser.add_argument(
    '--offset',
    type=int,
    help='start offset of items that will be fetched from each target',
)
argparser.add_argument(
    '--limit',
    type=int,
    help='max count of items that will be fetched from each target',
)
argparser.add_argument(
    '--clear',
    type=bool,
    default=False,
    help='should previous dump been clean',
)


def initialize(session, clear):
    if clear:
        if os.path.exists(DUMP_PATH):
            shutil.rmtree(DUMP_PATH)
        if os.path.exists(LOG_PATH):
            shutil.rmtree(LOG_PATH)

    if not os.path.exists(CURRENT_DUMP_PATH):
        os.makedirs(CURRENT_DUMP_PATH)
        os.makedirs(CURREN_IMAGES_PATH)

    if not os.path.exists(CURRENT_LOG_PATH):
        os.makedirs(CURRENT_LOG_PATH)


def run(session, name, target, offest, limit):
    sqliteKeeper = Sqlite(
        session,
        os.path.join(CURRENT_DUMP_PATH, 'targets.db'),
    )
    jsonKeeper = Json(
        session,
        os.path.join(CURRENT_DUMP_PATH, '{0}.json'.format(name)),
    )

    handler = logging.FileHandler(
        os.path.join(CURRENT_LOG_PATH, '{0}.log'.format(name))
    )
    formatter = Formatter(Formatter.BASE_FORMAT, Formatter.TIME_FORMAT)
    handler.setFormatter(formatter)
    logger = logging.getLogger(name)
    logger.setLevel(logging.DEBUG)
    logger.addHandler(handler)

    target = target(
        IMediator(logger, CURREN_IMAGES_PATH),
        Wiki(logger),
        logger,
        [sqliteKeeper, jsonKeeper]
    )
    if offest is not None:
        target.OFFSET = offest
    if limit is not None:
        target.LIMIT = limit
    target.process()


arguments = argparser.parse_args()

DUMP_PATH = os.path.abspath(os.path.join(__file__, '..', 'dump'))
CURRENT_DUMP_PATH = os.path.join(DUMP_PATH, arguments.session)
CURREN_IMAGES_PATH = os.path.join(CURRENT_DUMP_PATH, 'images')

LOG_PATH = os.path.abspath(os.path.join(__file__, '..', 'log'))
CURRENT_LOG_PATH = os.path.join(LOG_PATH, arguments.session)

initialize(arguments.session, bool(arguments.clear))
for name, target in targets.__dict__.items():
    if len(arguments.targets) == 0 or name in arguments.targets:
        if isinstance(target, type):
            if issubclass(target, Target):
                Thread(target=run, args=(
                    arguments.session,
                    name,
                    target,
                    arguments.offset,
                    arguments.limit,
                )).start()
