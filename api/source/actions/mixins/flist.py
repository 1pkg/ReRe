from collections import defaultdict

from .fsingle import FSingle


class FList(FSingle):
    def _format(self, lands):
        parent = super()  # scary thing
        return {
            land: [parent._format(task, False) for task in tasks]
            for land, tasks in lands.items()
        }
