class Keeper:
    def _prepare(self, items):
        return [{
            'name': item['name'],
            'description': item['description'],
            'source': item['source'],
            'link': item['link'],
            'subjects': item['subjects'],
        } for item in items]

    def write(self, items):
        return NotImplemented
