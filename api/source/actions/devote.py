import base
from models import Effect, Setting
from .mixins import Access


class Devote(Access):
    CONNECTION_LIMIT = base.Constant.RAREFIED_CONNECTION_LIMIT
    CACHE_EXPIRE = base.Constant.DEFAULT_CACHE_EXPIRE

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
