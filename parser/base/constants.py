from os import path


class Constants:
    DUMP_PATH = path.abspath(path.join(__file__, '..', '..', 'dump'))
    LOG_PATH = path.abspath(path.join(__file__, '..', '..', 'log'))
