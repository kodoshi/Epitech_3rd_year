CREATE TABLE user (
  id         INTEGER      NOT NULL AUTO_INCREMENT,
  username   VARCHAR(256) NOT NULL,
  password   VARCHAR(256) NOT NULL,
  CONSTRAINT PRIMARY KEY (id),
  CONSTRAINT unique_username UNIQUE KEY (username)
);

CREATE TABLE oauth_twitter (
  id                 INTEGER      NOT NULL AUTO_INCREMENT,
  user_id            INTEGER      NOT NULL,
  oauth_token        VARCHAR(256) NOT NULL,
  oauth_token_secret VARCHAR(256) NOT NULL,
  twitter_user_id    VARCHAR(256) NOT NULL,
  screen_name        VARCHAR(256) NOT NULL,
  CONSTRAINT PRIMARY KEY (id),
  CONSTRAINT unique_user_id UNIQUE KEY (user_id),
  FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);