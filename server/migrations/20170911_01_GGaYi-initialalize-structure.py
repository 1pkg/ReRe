"""
initialalize structure
"""

from yoyo import step

__depends__ = {}

group([
    # category
    step(
        """
          CREATE TABLE IF NOT EXISTS category (
            id SERIAL NOT NULL PRIMARY KEY,
            name VARCHAR(256) NOT NULL UNIQUE,
            description TEXT DEFAULT NULL,
            parent_category_id INT DEFAULT NULL REFERENCES category (id) ON DELETE CASCADE,
            time_stamp TIMESTAMP NOT NULL DEFAULT NOW(),
            CHECK (parent_category_id != id)
          );
        """,
        """
          DROP TABLE IF EXISTS option_category;
        """,
    ),
    # option
    step(
        """
          CREATE TABLE IF NOT EXISTS option (
            id SERIAL NOT NULL PRIMARY KEY,
            name VARCHAR(256) NOT NULL UNIQUE,
            description TEXT DEFAULT NULL,
            category_id INT NOT NULL REFERENCES category (id) ON DELETE CASCADE,
            time_stamp TIMESTAMP NOT NULL DEFAULT NOW()
          );
        """,
        """
          DROP TABLE IF EXISTS option;
        """,
    ),
    # reference
    step(
        """
          DROP TYPE IF EXISTS reference_source;
          CREATE TYPE reference_source AS ENUM ('wiki');
          CREATE TABLE IF NOT EXISTS reference (
            id SERIAL NOT NULL PRIMARY KEY,
            source reference_source NOT NULL DEFAULT 'wiki',
            link VARCHAR(256) NOT NULL,
            message VARCHAR(256) NOT NULL UNIQUE,
            description TEXT DEFAULT NULL,
            option_id INT NOT NULL REFERENCES option (id) ON DELETE CASCADE,
            time_stamp TIMESTAMP NOT NULL DEFAULT NOW()
          );
        """,
        """
          DROP TABLE IF EXISTS reference;
          DROP TYPE IF EXISTS reference_source;
        """,
    ),
])

group([
    # subject
    step(
        """
          DROP TYPE IF EXISTS subject_type;
          CREATE TYPE subject_type AS ENUM ('image');
          CREATE TABLE IF NOT EXISTS subject (
            id SERIAL NOT NULL PRIMARY KEY,
            type subject_type NOT NULL DEFAULT 'image',
            object_id INT NOT NULL UNIQUE,
            option_id INT NOT NULL REFERENCES option (id) ON DELETE CASCADE,
            time_stamp TIMESTAMP NOT NULL DEFAULT NOW()
          );
        """,
        """
          DROP TABLE IF EXISTS subject;
          DROP TYPE IF EXISTS subject_type;
        """,
    ),
    # image
    step(
        """
          CREATE TABLE IF NOT EXISTS image (
            id SERIAL NOT NULL PRIMARY KEY,
            source_link VARCHAR(256) NOT NULL UNIQUE,
            source_alt VARCHAR(256) DEFAULT NULL,
            description TEXT DEFAULT NULL,
            time_stamp TIMESTAMP NOT NULL DEFAULT NOW()
          );
        """,
        """
          DROP TABLE IF EXISTS image;
        """,
    ),
    # effect
    step(
        """
          CREATE TABLE IF NOT EXISTS effect (
            id SERIAL NOT NULL PRIMARY KEY,
            name VARCHAR(256) NOT NULL UNIQUE,
            is_active BOOL NOT NULL DEFAULT TRUE,
            description TEXT DEFAULT NULL,
            time_stamp TIMESTAMP NOT NULL DEFAULT NOW()
          );
        """,
        """
          DROP TABLE IF EXISTS effect;
        """,
    ),
    # effect_conflict
    step(
        """
          CREATE TABLE IF NOT EXISTS effect_conflict (
            effect_id_first INT NOT NULL REFERENCES effect (id) ON DELETE CASCADE,
            effect_id_second INT NOT NULL REFERENCES effect (id) ON DELETE CASCADE,
            description TEXT DEFAULT NULL,
            time_stamp TIMESTAMP NOT NULL DEFAULT NOW(),
            PRIMARY KEY (effect_id_first, effect_id_second);
          );
        """,
        """
          DROP TABLE IF EXISTS effect_conflict;
        """,
    ),
])

group([
    # assist
    step(
        """
          CREATE TABLE IF NOT EXISTS assist (
            id SERIAL NOT NULL PRIMARY KEY,
            name VARCHAR(256) NOT NULL UNIQUE,
            description TEXT DEFAULT NULL,
            time_stamp TIMESTAMP NOT NULL DEFAULT NOW()
          );
        """,
        """
          DROP TABLE IF EXISTS assist;
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
            is_active BOOL NOT NULL DEFAULT TRUE,
            description TEXT DEFAULT NULL,
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
            host VARCHAR(256) NOT NULL,
            user_agent VARCHAR(256) NOT NULL,
            ip INET NOT NULL,
            identifier VARCHAR(256) NOT NULL,
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
            is_correct BOOL NOT NULL,
            chosed_option_id INTEGER NOT NULL REFERENCES option (id) ON DELETE CASCADE,
            session_id INTEGER NOT NULL REFERENCES session (id) ON DELETE CASCADE,
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
            source_link VARCHAR(256) DEFAULT NULL,
            task_id INTEGER NOT NULL REFERENCES task (id) ON DELETE CASCADE,
            session_id INTEGER NOT NULL REFERENCES session (id) ON DELETE CASCADE,
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
            value VARCHAR(256) NOT NULL
          );
        """,
        """
          DROP TABLE IF EXISTS setting;
        """,
    ),
])
