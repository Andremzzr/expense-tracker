import { PgSqlService } from "../services/PgSqlService";
import { Pool } from 'pg';

const pool = new Pool({
  user: 'user',
  password: 'pass',
  host: 'localhost',
  port: 5432,
  database: 'database'
});

const databaseService = new PgSqlService(pool);

async function getExpense(req, res, next) {
  try {
    const { id } = req.params;
    const expense = await databaseService.getExpense(id);
    return res.json(expense)
  } catch (error) {
    return res.status(500).json({ error: "Failed to get expense. Please try again later." });
  }
}

async function createExpense(req, res, next) {
  try {
    const { value, description, date, userid } = req.body;
    
    if (!value || !description || !date || !userid) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const expense = await databaseService.createExpense({ value, description, date, userid });

    return res.json({message: 'Success!'});

  } catch (error) {
    console.error("Error creating expense:", error); 
    
    return res.status(500).json({ error: "Failed to create expense. Please try again later." });
  }
}


module.exports = { getExpense, createExpense};