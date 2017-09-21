import base

class Task(base.DbService):
    def __init__(self, connection):
        super().__init__(connection)

    def fetchByIdWithSubjectOption(self, id):
        return self._fetch("""
            SELECT subject.id as subject_id, option.id as option_id, option.name as option FROM task
            INNER JOIN subject ON subject.id = task.subject_id
            INNER JOIN option ON option.id = subject.option_id
            WHERE task.id = %(id)s
            LIMIT 1
        """, {'id': id,})[0]

    def push(self, subjectId, optionIds):
        id = self._execute("""
            INSERT INTO task (is_active, description, subject_id)
            VALUES (TRUE, 'auto generated task', %(subject_id)s)
            RETURNING id
        """, {'subject_id': subjectId,}, True)
        for optionId in optionIds:
            self._execute("""
                INSERT INTO task_option (task_id, option_id)
                VALUES (%(task_id)s, %(option_id)s)
            """, {'task_id': id, 'option_id': optionId,}, False, False)
        self._commit()
        return id
