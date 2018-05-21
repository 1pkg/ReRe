from models import Effect, Setting
from .mixins import Access


class Devote(Access):
    CONNECTION_LIMIT = '1/minute;10/hour;100/day'
    CACHE_EXPIRE = 86400

    def _process(self, request):
        shaders = [{
            'name': effect.name,
            'code': effect.shader,
            'uniform': effect.uniform,
        } for effect in Effect.query]
        setting = {
            Setting.NAME_CHOSE_PERIOD:
                Setting.get(Setting.NAME_CHOSE_PERIOD),
            Setting.NAME_SHARE_TITLE:
                Setting.get(Setting.NAME_SHARE_TITLE),
            Setting.NAME_COPYRIGHT_TEXT:
                Setting.get(Setting.NAME_COPYRIGHT_TEXT),
            Setting.NAME_DISCLAIMER_TEXT:
                Setting.get(Setting.NAME_DISCLAIMER_TEXT),
        }
        return {
            'shaders': shaders,
            'settings': setting,
        }
