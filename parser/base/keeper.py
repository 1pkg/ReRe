import re


class Keeper:
    def __init__(self, session):
        self.__session = session

    def __fix(self, item):
        return re.sub('\s+', ' ', item).strip()

    def _sanitalize(self, items):
        newItems = []
        for item in items:
            newItems.append({
                'name': self.__fix(item['name']),
                'description': self.__fix(item['description']),
                'source': item['source'],
                'link': item['link'],
                'subjects': item['subjects'],
            })
        return newItems

    def write(self, items):
        return {
            'session': self.__session,
            'items': self._sanitalize(items),
        }
