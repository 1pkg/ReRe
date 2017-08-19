DROP TYPE IF EXISTS option_link_source;
CREATE TYPE option_link_source AS ENUM ('wiki', 'google');
CREATE TABLE IF NOT EXISTS option_link (
  id SERIAL NOT NULL PRIMARY KEY,
  source option_link_source NOT NULL DEFAULT 'wiki',
  link VARCHAR(256) NOT NULL UNIQUE,
  option_id INT NOT NULL REFERENCES option (id) ON DELETE CASCADE,
  time_stamp TIMESTAMP NOT NULL DEFAULT NOW()
);
