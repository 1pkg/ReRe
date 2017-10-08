class Sequence:
    def find(self, sequence, comporator):
        for i in range(0, len(sequence)):
            element = sequence[i]
            if (comporator(element)):
                return i

    def purge(self, data, excesses):
        if isinstance(data, dict):
            for excess in excesses:
                if (excess in data):
                    del data[excess]
        if isinstance(data, dict):
            for key, value in data.items():
                data[key] = self.purge(value, excesses)
        elif isinstance(data, list):
            for i in range(0, len(data)):
                data[i] = self.purge(data[i], excesses)
        return data
