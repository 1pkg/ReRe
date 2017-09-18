class Action:
    def __call__(self, *args, **kwargs):
        return self.__sanitalize(self._process(args, kwargs))

    def _process(self, *args, **kwargs):
        pass

    def __sanitalize(self, data):
        if isinstance(data, dict):
            try:
                del data['id']
                del data['description']
                del data['time_stamp']
            except:
                pass
            for key, value in data.items():
                data[key] = self.__sanitalize(value)
        return data
