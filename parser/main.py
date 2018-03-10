import os
import datetime
import logging
import shutil
from argparse import ArgumentParser
from threading import Thread

import targets
from base import Formatter, Target
from keepers import Json, Sqlite
from fetchers import Image, Wiki

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
    '--start_offset',
    type=int,
    help='start offset of items that will be fetched from each target',
)
argparser.add_argument(
    '--max_count',
    type=int,
    help='max count of items that will be fetched from each target',
)
argparser.add_argument(
    '--max_try',
    type=int,
    help='max count of fetch try on various errors',
)
argparser.add_argument(
    '--clean',
    help='should previous dump be clean',
)


def initialize(session, clean):
    if clean == True:
        if os.path.exists(DUMP_PATH):
            shutil.rmtree(DUMP_PATH)
        if os.path.exists(LOG_PATH):
            shutil.rmtree(LOG_PATH)

    if not os.path.exists(CURRENT_DUMP_PATH):
        os.makedirs(CURRENT_DUMP_PATH)
        os.makedirs(CURREN_IMAGES_PATH)

    if not os.path.exists(CURRENT_LOG_PATH):
        os.makedirs(CURRENT_LOG_PATH)


def run(
    session,
    name,
    target,
    startOffest,
    maxCount,
    maxTry,
):
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
        Image(logger),
        Wiki(logger),
        logger,
        [sqliteKeeper, jsonKeeper]
    )
    if startOffest is not None:
        target.START_OFFSET = startOffest
    if maxCount is not None:
        target.MAX_COUNT = maxCount
    if maxTry is not None:
        target.MAX_TRY = maxTry
    target.process()


arguments = argparser.parse_args()

DUMP_PATH = os.path.abspath(os.path.join(__file__, '..', 'dump'))
CURRENT_DUMP_PATH = os.path.join(DUMP_PATH, arguments.session)
CURREN_IMAGES_PATH = os.path.join(CURRENT_DUMP_PATH, 'images')

LOG_PATH = os.path.abspath(os.path.join(__file__, '..', 'log'))
CURRENT_LOG_PATH = os.path.join(LOG_PATH, arguments.session)

initialize(arguments.session, bool(arguments.clean))
for name, target in targets.__dict__.items():
    if isinstance(target, type) and issubclass(target, Target) \
            and (len(arguments.targets) == 0 or name in arguments.targets):
        Thread(target=run, args=(
            arguments.session,
            name,
            target,
            arguments.start_offset,
            arguments.max_count,
            arguments.max_try,
        )).start()
