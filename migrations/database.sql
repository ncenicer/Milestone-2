-- Up
CREATE TABLE users
(
  id INTEGER PRIMARY KEY,
  firstName STRING,
  lastName STRING,
  email STRING,
  password STRING
);

-- Down
DROP TABLE users;
