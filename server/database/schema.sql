-- SQLBook: Code


CREATE TABLE parent (
    id_parent INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    firstname VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE
);

-- mail = jdoe@mail.com, password = "azerty"
INSERT INTO parent (email, password, lastname, firstname)
VALUES
  ("jdoe@mail.com", "$argon2id$v=19$m=65536,t=3,p=4$rcJ6ooNfO/qMKTiH3DZpdg$yWTge77Bj1NtSlZqI0SknSRgRiD5CQw03SRC9QeVaRo", "Doe", "John"),
  ("janedoe@mail.com", "$argon2id$v=19$m=65536,t=3,p=4$rcJ6ooNfO/qMKTiH3DZpdg$yWTge77Bj1NtSlZqI0SknSRgRiD5CQw03SRC9QeVaRo", "Doe", "Jane");




CREATE TABLE user (
  id_user INT AUTO_INCREMENT PRIMARY KEY,
  prenom VARCHAR(50) NOT NULL,
 classe VARCHAR(50) NOT NULL,
 birthday DATE NOT NULL,
photo VARCHAR(255) NOT NULL,
id_parent INT,
CONSTRAINT fk_parent
FOREIGN KEY (id_parent) REFERENCES parent(id_parent)
);

INSERT INTO user (prenom, classe, birthday, photo, id_parent)
VALUES ('Camille', 'CP', '2019-01-01', '/public/avatarphotos/cat.png', 1),
("Anthony", "CE2", "2003-10-26", '/public/avatarphotos/cat.png', 1),
("Julyyyyy", "Grande Section", "2003-10-26", '/public/avatarphotos/cat.png', 2);

