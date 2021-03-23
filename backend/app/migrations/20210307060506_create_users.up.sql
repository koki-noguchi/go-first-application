CREATE TABLE users (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    email VARCHAR(60) NOT NULL UNIQUE,
    password VARCHAR(60) NOT NULL,
    name VARCHAR(256) NOT NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB;