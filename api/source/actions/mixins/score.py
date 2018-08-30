from base import Constant

from .access import Access


class Score(Access):
    def _calculate(self, unit, use_freebie=True):
        db = self._application.db
        settings = self._application.settings

        small_score_unit = settings[Constant.SETTING_SMALL_SCORE_UNIT]
        if use_freebie and self._session.account.freebie > 0:
            self._session.account.freebie -= small_score_unit
        elif unit < 0:
            self._session.account.score += unit
            self._session.account.factor = 1
        else:
            factor = self._session.account.factor
            self._session.account.score += factor * unit
            max_factor = settings[Constant.SETTING_MAX_SCORE_FACTOR]
            self._session.account.factor, factor = factor + 1, factor + 1
            if factor >= max_factor:
                self._session.account.factor = max_factor
                self._session.account.freebie += small_score_unit
        db.session.commit()
