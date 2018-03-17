from datetime import datetime

from base import Component


class Datetime(Component):
    def timestamp(self):
        return datetime.today().timestamp()
