from models import Effect, Setting
from .mixins import Access


class Devote(Access):
    CONNECTION_LIMIT = '1/minute;10/hour;100/day'
    CACHE_EXPIRE = 86400

    def _process(self, request):
        shaders = []
        effects = Effect.query.all()
        for effect in effects:
            shaders.append({
                'name': effect.name,
                'shader': effect.shader,
                'uniform': effect.uniform,
            })
        setting = {
            'choose-period': int(Setting.get('choose-period')),
            'disclaimer-message': str(Setting.get('disclaimer-message')),
        }
        return {
            'shaders': shaders,
            'settings': setting,
        }
