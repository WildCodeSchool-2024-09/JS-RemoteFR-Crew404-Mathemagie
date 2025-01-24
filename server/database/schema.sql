-- SQLBook: Code
CREATE TABLE user (
  id_user INT AUTO_INCREMENT PRIMARY KEY,
  prenom VARCHAR(50) NOT NULL,
 classe VARCHAR(50) NOT NULL,
 birthday DATE NOT NULL,
photo VARCHAR(255) NOT NULL
);

INSERT INTO user (prenom, classe, birthday, photo)
VALUES ('Camille', 'CP', '2019-01-01', '/public/avatarphotos/cat.png');