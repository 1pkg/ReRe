from .db import Db


class Task(Db):
    def fetchByLabel(self, label):
        task = self._fetch("""
            SELECT * FROM task
            WHERE label = %(label)s
            LIMIT 1
        """, {'label': label, })
        if (len(task) == 1):
            return task[0]
        else:
            return None

    def fetchOneByRandom(self):
        task = self._fetch("""
            SELECT * FROM task
            ORDER BY RANDOM()
            LIMIT 1
        """)
        if (len(task) == 1):
            return task[0]
        else:
            return None

    def fetchByIdWithOptions(self, id):
        return self._fetch("""
            SELECT
                task_option.option_id,
                subject.option_id AS correct_option_id
            FROM task
            INNER JOIN subject ON subject.id = task.subject_id
            INNER JOIN task_option ON task_option.task_id = task.id
            WHERE id = %(id)s
        """, {'id': id, })

    def push(self, label, subjectId, optionIds, effectIds):
        taskId = self._execute("""
            INSERT INTO task (label, subject_id)
            VALUES (%(label)s, %(subject_id)s)
            RETURNING id
        """, {'label': label, 'subject_id': subjectId, })['id']
        for optionId in optionIds:
            self._execute("""
                INSERT INTO task_option (task_id, option_id)
                VALUES (%(task_id)s, %(option_id)s)
            """, {'task_id': taskId, 'option_id': optionId, }, False)
        for effectId in effectIds:
            self._execute("""
                INSERT INTO task_effect (task_id, effect_id)
                VALUES (%(task_id)s, %(effect_id)s)
            """, {'task_id': taskId, 'effect_id': effectId, }, False)
        self._commit()
        return taskId

    def repush(self, label, oldTaskid, effectIds):
        newTaskId = self._execute("""
            INSERT INTO task (label, subject_id)
            VALUES (%(label)s, (SELECT subject_id FROM task WHERE id = %(id)s))
            RETURNING id
        """, {'label': label, 'id': oldTaskid, })['id']
        self._execute("""
            INSERT INTO task_option
            SELECT %(new_task_id)s, option_id FROM task_option
            WHERE task_id = %(old_task_id)s
        """, {'new_task_id': newTaskId, 'old_task_id': oldTaskid, }, False)
        for effectId in effectIds:
            self._execute("""
                INSERT INTO task_effect (task_id, effect_id)
                VALUES (%(new_task_id)s, %(effect_id)s)
            """, {'new_task_id': newTaskId, 'effect_id': effectId, }, False)
        self._commit()
        return newTaskId
