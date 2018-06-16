from re import sub
from logging import Formatter


class Formatter(Formatter):
    BASE_FORMAT = '%(asctime)s %(levelname)s %(name)s: %(message)s'
    TIME_FORMAT = '%Y-%m-%d %H:%M:%S'

    def format(self, record):
        record.msg = sub('\s+', ' ', record.msg).strip()
        return super().format(record)
