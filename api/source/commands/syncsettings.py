from os import path
from json import load

from base import Command
from models import Setting


class SyncSettings(Command):
    NAME = 'sync-settings'
    DESCRIPTION = 'Sync vcs settings with database.'

    def execute(self):
        vsc_settings = self.__sync()
        with self._application.instance.app_context():
            for setting in Setting.query:
                if setting.name not in vsc_settings:
                    self._application.db.session.delete(setting)
                else:
                    vsc_setting = vsc_settings[setting.name]
                    setting.value = vsc_setting['value']
            for name, vsc_setting in vsc_settings.items():
                if Setting.query \
                    .filter(Setting.name == vsc_setting['name'])\
                    .first() \
                        is None:
                    setting = Setting(
                        name=vsc_setting['name'],
                        value=vsc_setting['value'],
                    )
                    self._application.db.session.add(setting)
            self._application.db.session.commit()

    def __sync(self):
        settings = {}
        setting_file = path.join(
            path.dirname(__file__),
            '..',
            '..',
            'settings',
            'setting.json',
        )
        with open(setting_file) as setting_data:
            for setting_item in load(setting_data):
                settings[setting_item['name']] = {
                    'name': setting_item['name'],
                    'value': str(setting_item['value']),
                }
        return settings
