from datetime import datetime

from base import Component


class Datetime(Component):
    def timestamp(self):
        return datetime.utcnow().timestamp()

    def diff(self, first, second=datetime.utcnow()):
        diff = second - first
        return diff.total_seconds()
