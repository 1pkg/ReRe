from flask import request

from base import Component
from models import Orientation


class Device(Component):
    def orientation(self):
        if request.MOBILE:
            return Orientation.portrait
        else:
            return Orientation.landscape
