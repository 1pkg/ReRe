from .mixins import Access


class Land(Access):
    CONNECTION_LIMIT = '1/minute;10/hour;100/day'
    CACHE_EXPIRE = 86400

    def _process(self, request):
        return {}
