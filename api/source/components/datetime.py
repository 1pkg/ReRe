from datetime import datetime, timedelta

from base import Component


class Datetime(Component):
    def timestamp(self):
        return datetime.utcnow().timestamp()

    def date(self, delta=0):
        return datetime.utcnow() + timedelta(delta)

    def diff(self, first, second=datetime.utcnow()):
        diff = second - first
        return diff.total_seconds()
