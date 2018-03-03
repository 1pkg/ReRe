import re
import logging


class Formatter(logging.Formatter):
    BASE_FORMAT = '%(asctime)s %(levelname)s %(name)s: %(message)s'
    TIME_FORMAT = '%Y-%m-%d %H:%M:%S'

    def format(self, record):
        record.msg = re.sub('\s+', ' ', record.msg).strip()
        return super().format(record)
