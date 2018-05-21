from base import Component


class Validator(Component):
    def ishex(self, value):
        try:
            int(value, 16)
            return True
        except Exception:
            return False

    def isnumeric(self, value, positive=True):
        try:
            value = int(value)
            if positive:
                return value > 0
            return True
        except Exception:
            return False

    def isempty(self, value):
        return value is None or value == '' or value == 'None'
