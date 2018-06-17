from logging import FileHandler, getLogger, DEBUG
from os import path, makedirs
from datetime import datetime
from shutil import rmtree
from argparse import ArgumentParser
from threading import Thread

import targets
from base import Formatter, Target
from keepers import Json, Sqlite
from fetchers import IMediator, Wiki

argparser = ArgumentParser(description='Parser')
argparser.add_argument(
    '--name',
    type=str,
    default=str(datetime.today().timestamp()),
    help='name for folders structure',
)
argparser.add_argument(
    '--targets',
    nargs='*',
    default=[],
    help='target name list',
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
    help='should previous dump be clean',
)


def run(name, target, limit):
    sqlite_keeper = Sqlite(path.join(CURRENT_DUMP_PATH, 'target.db'))
    json_keeper = Json(path.join(CURRENT_JSON_PATH, f'{name}.json'))

    handler = FileHandler(path.join(CURRENT_LOG_PATH, f'{name}.log'))
    formatter = Formatter(Formatter.BASE_FORMAT, Formatter.TIME_FORMAT)
    handler.setFormatter(formatter)
    logger = getLogger(name)
    logger.setLevel(DEBUG)
    logger.addHandler(handler)

    target(
        IMediator(logger, CURRENT_IMAGE_PATH),
        Wiki(logger),
        logger,
        [sqlite_keeper, json_keeper],
        limit,
    ).process()


arguments = argparser.parse_args()

CURRENT_DUMP_PATH = path.join('/', 'var', 'dump', arguments.name)
CURRENT_IMAGE_PATH = path.join(CURRENT_DUMP_PATH, 'images')
CURRENT_JSON_PATH = path.join(CURRENT_DUMP_PATH, 'targets')
CURRENT_LOG_PATH = path.join(CURRENT_DUMP_PATH, 'logs')

if arguments.clear and path.exists(CURRENT_DUMP_PATH):
    rmtree(CURRENT_DUMP_PATH)
if not path.exists(CURRENT_DUMP_PATH):
    makedirs(CURRENT_DUMP_PATH)
    makedirs(CURRENT_IMAGE_PATH)
    makedirs(CURRENT_JSON_PATH)
    makedirs(CURRENT_LOG_PATH)

for name, target in targets.__dict__.items():
    if len(arguments.targets) == 0 or name.lower() in arguments.targets:
        if isinstance(target, type):
            if issubclass(target, Target):
                Thread(target=run, args=(
                    name.lower(),
                    target,
                    arguments.limit,
                )).start()
