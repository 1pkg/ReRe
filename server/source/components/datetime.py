import datetime

from base import Component


class Datetime(Component):
    def timestamp(self):
        return datetime.datetime.today().timestamp()
