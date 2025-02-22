import { PgSqlService } from "../services/PgSqlService";
import { IExpense } from "../interfaces/IExpense";
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



async function updateExpense(req, res, next) {
  try {
    const { value, description, date, userid } = req.body;
    const { id } = req.params;

    
    if (!value && !description && !date && !userid) {
      return res.status(400).json({ error: "No fields selected." });
    }

    const updatePayload : Partial<IExpense> = {}

    if (value !== undefined) updatePayload.value = value;
    if (description !== undefined) updatePayload.description = description;
    if (date !== undefined) updatePayload.date = date;
    if (userid !== undefined) updatePayload.userid = userid;

    const expenseUpdated = await databaseService.updateExpense(id, updatePayload);
    
    if( !expenseUpdated ) {
      return res.status(404).json({ error: "Expense not found or wasn't updated." });
    }

    return res.json({message: 'Expense updated!'});

  } catch (error) {
    console.error("Error creating expense:", error); 
    
    return res.status(500).json({ error: "Failed to update expense. Please try again later." });
  }
}

async function deleteExpense(req, res, next) {
  try {
    const { id } = req.params;

    if ( !id ) {
      return res.status(400).json({ error: "Missing expense id." });
    }

    const deleteExpense = databaseService.deleteExpense(id)

    if ( deleteExpense) {
      return res.json({message: 'Expense deleted!'});
    }
  } catch (error) {
    console.error("Error deleting expense:", error)

    return res.status(500).json({error: "Failed to delete expense."})
  }

}


module.exports = { getExpense, createExpense, updateExpense, deleteExpense};