import base
print(base)

class Task(base.SqlProvider):
    def __init__(self, connection):
        super().__init__(connection)

    def push(self, subjectId, optionIds):
        id = self._push("""
            INSERT INTO task (is_active, description, subject_id)
            VALUES (TRUE, 'auto generated task', %(subject_id)s)
            RETURNING id
        """, {'subject_id': subjectId,})
        print(id)
        for optionId in optionIds:
            self._execute("""
                INSERT INTO task_option (task_id, option_id)
                VALUES (%(task_id)s, %(option_id)s)
            """, {'task_id': id, 'option_id': optionId,}, False)
        self._commit()
