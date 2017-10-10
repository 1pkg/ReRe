class Sequence:
    def index(self, sequence, comporator):
        for i in range(0, len(sequence)):
            element = sequence[i]
            if (comporator(element)):
                return i

    def column(self, sequence, column):
        result = []
        for item in sequence:
            if (column in item):
                result.append(item[column])
        return result
