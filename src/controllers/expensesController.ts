import { PgSqlService } from "../services/PgSqlService";
import { IExpense } from "../interfaces/IExpense";
import { FilterOption } from "../interfaces/FilterOption";
const { databaseService } = require('../services/PgSqlService')


function isFilterOption(value: any): value is FilterOption {
  return Object.values(FilterOption).includes(value);
}

function getPage(page: number) {
    if ( !page ) {
      return 1
    }

    return page
}


async function getExpense(req, res, next) {
  const { id } = req.params;
  const { user } = req
  try {
    const expense = await databaseService.getExpense(id, user.userId);
    return res.json(expense)
  } catch (error) {
    return res.status(500).json({ error: "Failed to get expense. Please try again later." });
  }
}

async function getExpenses(req, res, next) {
  const { user } = req
  const { filter, page } = req.query;

  const currentPage = getPage(page)

  try {
    let expense;
    const totalRows = await databaseService.getExpensesTotalPages( user.userId );
    const totalPages = Math.ceil(totalRows / 50);

    if ( isFilterOption(filter) )  {
      expense = await databaseService.getExpenses(user.userId, filter, currentPage);
    } 
    else {
      expense = await databaseService.getExpenses(user.userId, undefined, currentPage);
    }

    return res.json({totalPages, currentPage , data: expense})

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: "Failed to get expense. Please try again later." });
  }
}

async function createExpense(req, res, next) {
  const { value, description, date } = req.body;
  const { user } = req
  
  if (!value || !description || !date) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    
    const expense = await databaseService.createExpense({ value, description, date, userid: user.userId });

    return res.json({message: 'Success!'});

  } catch (error) {
    console.error("Error creating expense:", error); 
    
    return res.status(500).json({ error: "Failed to create expense. Please try again later." });
  }
}



async function updateExpense(req, res, next) {
  const { user } = req;
  try {
    const { value, description, date } = req.body;
    const { id } = req.params;

    
    if (!value && !description && !date) {
      return res.status(400).json({ error: "No fields selected." });
    }

    const updatePayload : Partial<IExpense> = {}

    if (value !== undefined) updatePayload.value = value;
    if (description !== undefined) updatePayload.description = description;
    if (date !== undefined) updatePayload.date = date;

    const expenseUpdated = await databaseService.updateExpense(id, updatePayload, user.userId);
    
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
  const { id } = req.params;
  const { user } = req;

  if ( !id ) {
    return res.status(400).json({ error: "Missing expense id." });
  }
  try {
    const deleteExpense = await databaseService.deleteExpense(id, user.userId)

    if ( deleteExpense) {
      return res.status(200).json({message: 'Expense deleted!'});
    }

    return res.status(500).json({message: 'Failed to deleted!'});
    
  } catch (error) {
    console.error("Error deleting expense:", error)

    return res.status(500).json({error: "Failed to delete expense."})
  }

}


module.exports = { getExpense, getExpenses, createExpense, updateExpense, deleteExpense};