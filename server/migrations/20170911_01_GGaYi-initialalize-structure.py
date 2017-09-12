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
    )
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
            object_id INT NOT NULL,
            option_id INT NOT NULL REFERENCES option (id) ON DELETE CASCADE,
            time_stamp TIMESTAMP NOT NULL DEFAULT NOW()
          );
        """,
        """
          DROP TABLE IF EXISTS subject;
          DROP TYPE IF EXISTS subject_type;
        """,
    ),
    # effect
    step(
        """
          CREATE TABLE IF NOT EXISTS effect (
            id SERIAL NOT NULL PRIMARY KEY,
            name VARCHAR(256) NOT NULL UNIQUE,
            description TEXT DEFAULT NULL,
            time_stamp TIMESTAMP NOT NULL DEFAULT NOW()
          );
        """,
        """
          DROP TABLE IF EXISTS effect;
        """,
    ),
    # subject_effect
    step(
        """
          CREATE TABLE IF NOT EXISTS subject_effect (
            subject_id INT NOT NULL REFERENCES subject (id) ON DELETE CASCADE,
            effect_id INT NOT NULL REFERENCES subject (id) ON DELETE CASCADE,
            PRIMARY KEY (subject_id, effect_id)
          );
        """,
        """
          DROP TABLE IF EXISTS subject_effect;
        """,
    ),
    # image
    step(
        """
          CREATE TABLE IF NOT EXISTS image (
            id SERIAL NOT NULL PRIMARY KEY,
            source_link VARCHAR(256) NOT NULL UNIQUE,
            source_alt VARCHAR(256) NOT NULL,
            description TEXT DEFAULT NULL,
            time_stamp TIMESTAMP NOT NULL DEFAULT NOW()
          );
        """,
        """
          DROP TABLE IF EXISTS image;
        """,
    ),
])

group([
    # task
    step(
        """
          CREATE TABLE IF NOT EXISTS task (
            id SERIAL NOT NULL PRIMARY KEY,
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
])

group([
    # session
    step(
        """
          CREATE TABLE IF NOT EXISTS session (
            id SERIAL NOT NULL PRIMARY KEY,
            ip INET NOT NULL,
            device VARCHAR(256) NOT NULL,
            time_stamp TIMESTAMP NOT NULL DEFAULT NOW()
          );
        """,
        """
          DROP TABLE IF EXISTS session;
        """,
    ),
    # social_user
    step(
        """
          CREATE TABLE IF NOT EXISTS social_user (
            id SERIAL NOT NULL PRIMARY KEY,
            facebook_profile VARCHAR(256) DEFAULT NULL,
            twitter_profile VARCHAR(256) DEFAULT NULL,
            session_id INT NOT NULL REFERENCES session (id) ON DELETE CASCADE,
            time_stamp TIMESTAMP NOT NULL DEFAULT NOW(),
            UNIQUE (facebook_profile, twitter_profile),
            CHECK (facebook_profile IS NOT NULL OR twitter_profile IS NOT NULL)
          );
        """,
        """
          DROP TABLE IF EXISTS social_user;
        """,
    ),
])

group([
    # answer
    step(
        """
          CREATE TABLE IF NOT EXISTS answer (
            id SERIAL NOT NULL PRIMARY KEY,
            order_number SMALLINT NOT NULL,
            is_correct BOOL NOT NULL,
            liked_status BOOL NOT NULL DEFAULT FALSE,
            session_id INTEGER NOT NULL REFERENCES session (id) ON DELETE CASCADE,
            chosed_option_id INTEGER NOT NULL REFERENCES option (id) ON DELETE CASCADE,
            time_stamp TIMESTAMP NOT NULL DEFAULT NOW()
          );
        """,
        """
          DROP TABLE IF EXISTS answer;
        """,
    ),
    # social_share
    step(
        """
          CREATE TABLE IF NOT EXISTS social_share (
            id SERIAL NOT NULL PRIMARY KEY,
            facebook_link VARCHAR(256) DEFAULT NULL,
            twitter_link VARCHAR(256) DEFAULT NULL,
            answer_id INTEGER NOT NULL REFERENCES answer (id) ON DELETE CASCADE
          );
        """,
        """
          DROP TABLE IF EXISTS social_share;
        """,
    ),
])
