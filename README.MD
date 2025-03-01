# Expense Tracker
Application has porpouse to be an api for a frontend application that tracks user expenses using JWT authentication. 

### Architecture:
![projects achitecture](https://assets.roadmap.sh/guest/expense-tracker-api-m72p5.png)


### Application setup:
Run ``` npm install ``` on the root dir.

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

### Aplication Routes:
```/user``` handles all authentication process. Login and Register.
<br>
```/expense``` are the protected routes, that handles all aplication logic, such as:
# Expense API

Simple API for managing user expenses.

## Endpoints

### Get Single Expense
```
GET /expenses/:id
```
Returns a specific expense by ID.

### List Expenses
```
GET /expenses?filter=OPTION&page=NUMBER
```
Returns paginated expenses with optional filtering.

### Create Expense
```
POST /expenses
```
**Body:**
```json
{
  "value": 100.00,
  "description": "Grocery shopping",
  "date": "2023-11-15"
}
```
Creates a new expense.

### Update Expense
```
PUT /expenses/:id
```
**Body:** Any of these fields
```json
{
  "value": 120.00,
  "description": "Updated description",
  "date": "2023-11-16"
}
```
Updates an existing expense.

### Delete Expense
```
DELETE /expenses/:id
```
Deletes an expense.

## Notes
- All endpoints require authentication
- Pagination shows 50 items per page
- All dates use YYYY-MM-DD format
- All responses include success messages or error details

### Middleware:
auth.ts handles the jwt auth authentication using jsonwebtoken for token creation.