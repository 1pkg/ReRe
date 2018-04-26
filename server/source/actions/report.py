from .mixins import Access


class Report(Access):
    CONNECTION_LIMIT = '1/minute;10/hour;100/day'
    CACHE_EXPIRE = None

    def _process(self, request):
        return {}
