-- SQLBook: Code

CREATE TABLE parent (
    id_parent INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    firstname VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE
);


INSERT INTO parent (email, password, lastname, firstname)
VALUES
  ("jdoe@mail.com", "123456", "Doe", "John");



