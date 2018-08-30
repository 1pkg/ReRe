from base import Constant
from models import Effect, Setting
from .mixins import Crypto


class Devote(Crypto):
    CONNECTION_LIMIT = Constant.RAREFIED_CONNECTION_LIMIT
    CACHE_EXPIRE = Constant.DEFAULT_CACHE_EXPIRE

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
