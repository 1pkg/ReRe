from collections import defaultdict

from .single import Single


class List(Single):
    def _format(self, lands):
        result = defaultdict(list)
        for land, tasks in lands.items():
            for task in tasks:
                result[land].append(super()._format(task, False))
        return result
