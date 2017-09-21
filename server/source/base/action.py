class Action:
    def __call__(self, request):
        return self.__sanitalize(
            self._process(request)
        )

    def _process(self, request):
        return NotImplemented

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
