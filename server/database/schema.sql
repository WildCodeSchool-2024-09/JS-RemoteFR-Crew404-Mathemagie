

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




CREATE TABLE user (
  id_user INT AUTO_INCREMENT PRIMARY KEY,
  prenom VARCHAR(50) NOT NULL,
 classe VARCHAR(50) NOT NULL,
 birthday DATE NOT NULL,
photo VARCHAR(255) NOT NULL
);

INSERT INTO user (prenom, classe, birthday, photo)
VALUES ('Camille', 'CP', '2019-01-01', '/public/avatarphotos/cat.png');


