"""
initialalize structure
"""

from yoyo import step, group

__depends__ = {}

group([
    # category
    step(
        """
          CREATE TABLE IF NOT EXISTS category (
            id SERIAL NOT NULL PRIMARY KEY,
            name VARCHAR(256) NOT NULL UNIQUE,
            parent_category_id INT DEFAULT NULL
                REFERENCES category (id) ON DELETE CASCADE,
            CHECK (parent_category_id != id)
          );
        """,
        """
          DROP TABLE IF EXISTS category;
        """,
    ),
    # option
    step(
        """
          CREATE TABLE IF NOT EXISTS option (
            id SERIAL NOT NULL PRIMARY KEY,
            name VARCHAR(256) NOT NULL,
            description VARCHAR(1024) DEFAULT NULL,
            link VARCHAR(256) DEFAULT NULL,
            category_id INT NOT NULL REFERENCES category (id) ON DELETE CASCADE
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
            link VARCHAR(256) NOT NULL UNIQUE,
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
            name VARCHAR(256) NOT NULL UNIQUE
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
            label VARCHAR(256) NOT NULL UNIQUE,
            subject_id INT NOT NULL REFERENCES subject (id) ON DELETE CASCADE,
            time_stamp TIMESTAMP NOT NULL DEFAULT NOW()
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
            identifier VARCHAR(256) UNIQUE NOT NULL,
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
            order_number SMALLINT NOT NULL,
            option_id INTEGER NOT NULL
                REFERENCES option (id) ON DELETE CASCADE,
            session_id INTEGER NOT NULL
                REFERENCES session (id) ON DELETE CASCADE,
            time_stamp TIMESTAMP NOT NULL DEFAULT NOW()
          );
        """,
        """
          DROP TABLE IF EXISTS answer;
        """,
    ),
    # share
    step(
        """
          DROP TYPE IF EXISTS share_type;
          CREATE TYPE share_type AS ENUM ('facebook', 'twitter', 'redit');
          CREATE TABLE IF NOT EXISTS share (
            id SERIAL NOT NULL PRIMARY KEY,
            type share_type NOT NULL,
            link VARCHAR(256) DEFAULT NULL,
            task_id INTEGER NOT NULL REFERENCES task (id) ON DELETE CASCADE,
            session_id INTEGER NOT NULL
                REFERENCES session (id) ON DELETE CASCADE,
            time_stamp TIMESTAMP NOT NULL DEFAULT NOW()
          );
        """,
        """
          DROP TABLE IF EXISTS share;
          DROP TYPE IF EXISTS share_type;
        """,
    ),
])

group([
    # setting
    step(
        """
          CREATE TABLE IF NOT EXISTS setting (
            id SERIAL NOT NULL PRIMARY KEY,
            name VARCHAR(256) NOT NULL UNIQUE,
            value VARCHAR(1024) NOT NULL
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
          CREATE INDEX IF NOT EXISTS category_parent_category_idx
            ON category (parent_category_id);
          CREATE INDEX IF NOT EXISTS option_category_idx
            ON option (category_id);
          CREATE INDEX IF NOT EXISTS subject_option_idx
            ON subject (option_id);
          CREATE INDEX IF NOT EXISTS task_subject_idx
            ON task (subject_id);
          CREATE INDEX IF NOT EXISTS task_label_idx
            ON task (label);
          CREATE INDEX IF NOT EXISTS answer_option_idx
            ON answer (option_id);
          CREATE INDEX IF NOT EXISTS answer_session_idx
            ON answer (session_id);
          CREATE INDEX IF NOT EXISTS share_task_idx
            ON share (task_id);
          CREATE INDEX IF NOT EXISTS share_session_idx
            ON share (session_id);
        """,
        """
          DROP INDEX IF EXISTS
            category_parent_category_idx,
            option_category_idx,
            subject_option_idx,
            task_subject_idx,
            task_label_active_idx,
            answer_option_idx,
            share_type_link_idx,
            share_session_idx,
            answer_session_idx;
            share_task_idx;
            share_session_idx;
        """,
    ),
])
