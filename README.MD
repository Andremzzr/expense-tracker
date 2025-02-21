# Expense Tracker
Application has porpouse to be an api for a frontend application that tracks user expenses using JWT authentication. 


### Database Setup:
- Run: docker compose up -d on the /docker dir
- Connect to the database with some Database Manager (Dbeaver...)
- Run this querys to create the tables:
```
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL
);

CREATE TABLE expenses (
    id SERIAL PRIMARY KEY,
    value DECIMAL(10,2) NOT NULL,
    description TEXT NOT NULL,
    date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    userId INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id)
);
```