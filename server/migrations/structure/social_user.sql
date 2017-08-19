CREATE TABLE IF NOT EXISTS social_user (
  id SERIAL NOT NULL PRIMARY KEY,
  facebook_profile VARCHAR(256) DEFAULT NULL,
  twitter_profile VARCHAR(256) DEFAULT NULL,
  time_stamp TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE (facebook_profile, twitter_profile),
  CHECK (facebook_profile IS NOT NULL OR twitter_profile IS NOT NULL)
);
