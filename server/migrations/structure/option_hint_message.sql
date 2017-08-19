DROP TYPE IF EXISTS option_hint_message_source;
CREATE TYPE option_hint_message_source AS ENUM ('wiki');
CREATE TABLE IF NOT EXISTS option_hint_message (
  id SERIAL NOT NULL PRIMARY KEY,
  source option_hint_message_source NOT NULL DEFAULT 'wiki',
  message VARCHAR(256) NOT NULL UNIQUE,
  option_id INT NOT NULL REFERENCES option (id) ON DELETE CASCADE,
  time_stamp TIMESTAMP NOT NULL DEFAULT NOW()
);
