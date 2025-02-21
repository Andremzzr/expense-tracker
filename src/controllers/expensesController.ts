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
    next(error)
  }
}

async function createExpense(req, res, next) {
  try {
    const {value, description, date, userid} = req.body;
    console.log(req.body)
    const expense = await databaseService.createExpense({value, description, date, userid});

    return res.json(expense);

  } catch (error) {
    next(error)
  }
}

module.exports = { getExpense, createExpense};