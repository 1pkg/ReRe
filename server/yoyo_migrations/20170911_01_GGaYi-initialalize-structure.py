"""
initialalize structure
"""

from yoyo import step, group

__depends__ = {}

group([
    # option
    step(
        """
          CREATE TABLE IF NOT EXISTS option (
            id SERIAL NOT NULL PRIMARY KEY,
            name VARCHAR NOT NULL,
            description VARCHAR NOT NULL,
            link VARCHAR NOT NULL,
            source VARCHAR NOT NULL
          );
        """,
        """
          DROP TABLE IF EXISTS option;
        """,
    ),
])

group([
    # subject
    step(
        """
          CREATE TABLE IF NOT EXISTS subject (
            id SERIAL NOT NULL PRIMARY KEY,
            link VARCHAR NOT NULL UNIQUE,
            source VARCHAR NOT NULL UNIQUE,
            option_id INT NOT NULL REFERENCES option (id) ON DELETE CASCADE
          );
        """,
        """
          DROP TABLE IF EXISTS subject;
        """,
    ),
    # effect
    step(
        """
          CREATE TABLE IF NOT EXISTS effect (
            id SERIAL NOT NULL PRIMARY KEY,
            name VARCHAR NOT NULL UNIQUE,
            shader VARCHAR NOT NULL
          );
        """,
        """
          DROP TABLE IF EXISTS effect;
        """,
    ),
])

group([
    # task
    step(
        """
          CREATE TABLE IF NOT EXISTS task (
            id SERIAL NOT NULL PRIMARY KEY,
            label VARCHAR NOT NULL UNIQUE,
            time_stamp TIMESTAMP NOT NULL DEFAULT NOW(),
            subject_id INT NOT NULL REFERENCES subject (id) ON DELETE CASCADE
          );
        """,
        """
          DROP TABLE IF EXISTS task;
        """,
    ),
    # task_option
    step(
        """
          CREATE TABLE IF NOT EXISTS task_option (
            task_id INT NOT NULL REFERENCES task (id) ON DELETE CASCADE,
            option_id INT NOT NULL REFERENCES option (id) ON DELETE CASCADE,
            PRIMARY KEY (task_id, option_id)
          );
        """,
        """
          DROP TABLE IF EXISTS task_option;
        """,
    ),
    # task_effect
    step(
        """
          CREATE TABLE IF NOT EXISTS task_effect (
            task_id INT NOT NULL REFERENCES task (id) ON DELETE CASCADE,
            effect_id INT NOT NULL REFERENCES effect (id) ON DELETE CASCADE,
            PRIMARY KEY (task_id, effect_id)
          );
        """,
        """
          DROP TABLE IF EXISTS task_effect;
        """,
    ),
])

group([
    # session
    step(
        """
          CREATE TABLE IF NOT EXISTS session (
            id SERIAL NOT NULL PRIMARY KEY,
            user_host VARCHAR(256) NOT NULL,
            user_agent VARCHAR(256) NOT NULL,
            user_ip VARCHAR(256) NOT NULL,
            token VARCHAR(256) UNIQUE NOT NULL,
            time_stamp TIMESTAMP NOT NULL DEFAULT NOW()
          );
        """,
        """
          DROP TABLE IF EXISTS session;
        """,
    ),
    # answer
    step(
        """
          CREATE TABLE IF NOT EXISTS answer (
            id SERIAL NOT NULL PRIMARY KEY,
            time_stamp TIMESTAMP NOT NULL DEFAULT NOW(),
            task_id INTEGER NOT NULL
                REFERENCES task (id) ON DELETE CASCADE,
            option_id INTEGER NOT NULL
                REFERENCES option (id) ON DELETE CASCADE,
            session_id INTEGER NOT NULL
                REFERENCES session (id) ON DELETE CASCADE
          );
        """,
        """
          DROP TABLE IF EXISTS answer;
        """,
    ),
])

group([
    # setting
    step(
        """
          CREATE TABLE IF NOT EXISTS setting (
            id SERIAL NOT NULL PRIMARY KEY,
            name VARCHAR NOT NULL UNIQUE,
            value VARCHAR DEFAULT NULL
          );
        """,
        """
          DROP TABLE IF EXISTS setting;
        """,
    ),
])

group([
    # indexes
    step(
        """
          CREATE INDEX IF NOT EXISTS option_name_source_idx
            ON option (name, source);
          CREATE INDEX IF NOT EXISTS subject_option_idx
            ON subject (option_id);
          CREATE INDEX IF NOT EXISTS task_subject_idx
            ON task (subject_id);
          CREATE INDEX IF NOT EXISTS task_label_idx
            ON task (label);
          CREATE INDEX IF NOT EXISTS answer_task_idx
            ON answer (task_id);
          CREATE INDEX IF NOT EXISTS answer_option_idx
            ON answer (option_id);
          CREATE INDEX IF NOT EXISTS answer_session_idx
            ON answer (session_id);
        """,
        """
          DROP INDEX IF EXISTS
            option_name_source_idx,
            subject_option_idx,
            task_subject_idx,
            task_label_idx,
            answer_task_idx,
            answer_option_idx,
            answer_session_idx;
        """,
    ),
])
