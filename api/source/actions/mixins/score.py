from base import Action

class Score(Action):
    def _calculate(self, unit, use_freebie = True):
        db = self._application.db
        if use_freebie and self._session.account.freebie > 0:
            self._session.account.freebie -= 1
        else:
            self._session.account.score += unit
        db.session.commit()
