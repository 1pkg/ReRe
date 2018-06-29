from re import sub
from json import load
from os import path, listdir

from base import Command
from models import Effect


class SyncEffects(Command):
    NAME = 'sync-effects'
    DESCRIPTION = 'Sync vcs effects with database.'

    def execute(self):
        vsc_effects = self.__readsync()
        with self._application.instance.app_context():
            for effect in Effect.query:
                if effect.name not in vsc_effects:
                    self._application.db.session.delete(effect)
                else:
                    vsc_effect = vsc_effects[effect.name]
                    effect.shader = vsc_effect['shader']
                    effect.uniform = vsc_effect['uniform']
            for name, vsc_effect in vsc_effects.items():
                if Effect.query \
                    .filter(Effect.name == vsc_effect['name'])\
                        .first() is None:
                    effect = Effect(
                        name=vsc_effect['name'],
                        shader=vsc_effect['shader'],
                        uniform=vsc_effect['uniform'],
                    )
                    self._application.db.session.add(effect)
            self._application.db.session.commit()

    def __readsync(self):
        effects = {}
        directory = path.join(
            path.dirname(__file__),
            '..',
            '..',
            'effects',
            'list',
        )
        for file in listdir(directory):
            with open(path.join(directory, file)) as effect:
                effect = load(effect)
                shader = path.join(
                    directory,
                    '..',
                    'shaders',
                    f'{effect["shader"]}.frag',
                )
                name = path.splitext(file)[0]
                with open(shader, 'r') as frag:
                    frag = frag.read().strip().replace('\n', ' ')
                    frag = sub('\s+', ' ', frag)
                    effects[name] = {
                        'name': name,
                        'shader': {'frag': frag},
                        'uniform': effect['uniform'],
                    }
        return effects
