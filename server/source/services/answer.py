from .db import *

class Answer(Db):
    def fetchById(self, id):
        answer = self._fetch("""
            SELECT * FROM answer
            WHERE id = %(id)s
            LIMIT 1
        """, {'id': id,})
        if (len(answer) == 1):
            return answer[0]
        else:
            return None

    def fetchByIds(self, ids):
        return self._fetch("""
            SELECT * FROM answer
            WHERE id IN (%(ids)s)
        """, {'ids': ','.join([str(id) for id in ids]),})

    def push(self, orderNumber, isCorrect, chosedOptionId, identifier):
        self._execute("""
            INSERT INTO answer (order_number, is_correct, chosed_option_id, session_id)
            VALUES (%(order_number)s, %(is_correct)s, %(chosed_option_id)s, (SELECT id FROM session WHERE identifier = %(identifier)s))
        """, {'order_number': orderNumber, 'is_correct': isCorrect, 'chosed_option_id': chosedOptionId, 'identifier': identifier,})
