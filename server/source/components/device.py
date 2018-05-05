from base import Component

from models import Orientation


class Device(Component):
    def orientation(self, request):
        return Orientation.portrait \
            if request.MOBILE else \
            Orientation.landscape
