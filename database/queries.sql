CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

INSERT INTO usuarios (email, password) VALUES ('who@fbi.com', 'me');
INSERT INTO usuarios (email, password) VALUES ('where@fbi.com', 'there');
INSERT INTO usuarios (email, password) VALUES ('how@fbi.com', 'exactly');