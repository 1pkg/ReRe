from os import path
from json import load

from base import Command
from models import Setting


class SyncSettings(Command):
    NAME = 'sync-settings'
    DESCRIPTION = 'Sync vcs settings with database.'

    def execute(self):
        settings = []
        vsc_settings = self.__readsync()
        with self._application.instance.app_context():
            for setting in Setting.query:
                if setting.name not in vsc_settings:
                    self._application.db.session.delete(setting)
                else:
                    vsc_setting = vsc_settings[setting.name]
                    setting.value = vsc_setting['value']
            for _, vsc_setting in vsc_settings.items():
                if Setting.query \
                    .filter(Setting.name == vsc_setting['name'])\
                        .first() is None:
                    setting = Setting(
                        name=vsc_setting['name'],
                        value=vsc_setting['value'],
                    )
                    settings.append(setting)
            self._application.db.session.add_all(settings)
            self._application.db.session.commit()

    def __readsync(self):
        settings = {}
        file = path.join(
            path.dirname(__file__),
            '..',
            '..',
            'settings',
            'setting.json',
        )
        with open(file) as data:
            for setting in load(data):
                settings[setting['name']] = {
                    'name': setting['name'],
                    'value': str(setting['value']),
                }
        return settings
