from .db import Db


class Answer(Db):
    def push(self, orderNumber, optionId, sessionId):
        self._execute("""
            INSERT INTO answer (order_number, option_id, session_id)
            VALUES (
                %(order_number)s,
                %(option_id)s,
                $(sessionId)s
            )
        """, {
            'order_number': orderNumber,
            'option_id': optionId,
            'sessionId': sessionId,
        })
