from json import loads

from base import Constant
from models import Effect, Setting
from .mixins import Crypto


class Devote(Crypto):
    CACHE_EXPIRE = Constant.DEFAULT_CACHE_EXPIRE

    def _process(self, request):
        shaders = [{
            'name': effect.name,
            'code': loads(effect.shader),
            'uniform': loads(effect.uniform),
        } for effect in Effect.query]
        setting = {
            Setting.NAME_CHOSE_PERIOD:
                Setting.get(Setting.NAME_CHOSE_PERIOD),
        }
        return {
            'shaders': shaders,
            'settings': setting,
        }
