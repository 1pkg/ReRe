from base import Component


class Sequence(Component):
    def column(self, sequence, column):
        result = []
        for item in sequence:
            if isinstance(item, dict):
                if column in item:
                    result.append(item[column])
            else:
                if hasattr(item, column):
                    result.append(getattr(item, column))
        return result

    def index(self, sequence, callback):
        for index, item in enumerate(sequence):
            if callback(item):
                return index
        return -1
