-- SQLBook: Code

CREATE TABLE user (
    id_user INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    firstname VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE
);


INSERT INTO user (email, password, lastname, firstname)
VALUES
  ("jdoe@mail.com", "123456", "Doe", "John");



