from base import Component


class Validator(Component):
    def isHex(self, value):
        try:
            int(value, 16)
            return True
        except Exception:
            return False

    def isNumeric(self, value):
        try:
            return int(value) > 0
        except Exception:
            return False

    def isEmpty(self, value):
        return value is None or value == ''
