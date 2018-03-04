import re


class Keeper:
    def __init__(self, session):
        self.__session = session

    def __fix(self, item):
        if item is None:
            return None

        return re.sub(
            '\s+',
            ' ',
            item,
            flags=re.DOTALL | re.IGNORECASE
        ).strip()

    def _sanitalize(self, items):
        newItems = []
        for item in items:
            newItems.append({
                'name': self.__fix(item['name']),
                'description': self.__fix(item['description']),
                'source': self.__fix(item['source']),
                'link': item['link'],
                'category': {
                    'name': self.__fix(item['category']['name']),
                    'parentName': self.__fix(item['category']['parentName']),
                },
                'subjects': item['subjects'],
            })
        return newItems

    def write(self, items):
        return {
            'session': self.__session,
            'items': self._sanitalize(items),
        }
