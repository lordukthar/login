cd backend
node server.js

npm run start


/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

brew install postgresql

brew services start postgresql


psql --version

initdb /usr/local/var/postgres

psql postgres

CREATE USER myuser WITH PASSWORD 'mypassword';
CREATE DATABASE mydb;
GRANT ALL PRIVILEGES ON DATABASE mydb TO myuser;

nano /usr/local/var/postgres/pg_hba.conf




local   all             all                                     trust

TO ->


local   all             all                                     md5


RESTART
brew services restart postgresql

Connect
psql -U myuser -d mydb


create user table
psql -U myuser -d mydb

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


psql -U myuser -d mydb


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);




CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;



CREATE TRIGGER update_user_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();



psql -U myuser -d mydb


INSERT INTO users (username, password, email) 
VALUES ('john_doe', 'securepassword', 'john_doe@example.com');


INSERT INTO users (username, password, email) 
VALUES 
('john_doe', 'securepassword', 'john_doe@example.com'),
('jane_doe', 'anotherpassword', 'jane_doe@example.com');



SELECT * FROM users;

