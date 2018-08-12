from base import Action, Constant

class Score(Action):
    def _calculate(self, unit, use_freebie = True):
        db = self._application.db
        settings = self._application.settings
        if use_freebie and self._session.account.freebie > 0:
            self._session.account.freebie -= 1
        else:
            factor = 1 if unit < 0 else self._session.account.factor
            self._session.account.score += factor * unit
            factor = 1 if unit < 0 else self._session.account.factor + 1
            max_factor = settings[Constant.SETTING_MAX_SCORE_FACTOR]
            factor = max_factor if factor >= max_factor else factor
            self._session.account.factor = factor
        db.session.commit()
