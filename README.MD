# Expense Tracker
Application has porpouse to be an api for a frontend application that tracks user expenses using JWT authentication. 


### Database Setup:
- Run: docker compose up -d on the /docker dir
- Connect to the database with some Database Manager (Dbeaver...)
- Run this querys to create the tables:
```
// Create tables:
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

// Populates Database:
INSERT INTO your_table (value, description, date, userid)
SELECT 
    FLOOR(RANDOM() * 1000) AS value, 
    (ARRAY['Food', 'Transport', 'Entertainment', 'Health', 'Education', 'Shopping'])[FLOOR(RANDOM() * 6) + 1] AS description,
    '2025-02-01'::DATE + INTERVAL '1 day' * FLOOR(RANDOM() * 30) AS date,
    CASE WHEN RANDOM() > 0.5 THEN 3 ELSE 4 END AS userid
FROM generate_series(1, 200);
```