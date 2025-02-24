
import express from "express";
const { getExpense, createExpense, updateExpense, deleteExpense } = require('../controllers/expensesController');
const { jwtAuth } = require('../middlewares/auth');
const router = express.Router();

/**
 * Get expeneses 
 */
router.get("/:id", jwtAuth, getExpense );


/**
 * Create Expense route
 */
router.post("/", jwtAuth , createExpense);


/**
 * Update Expense route
 */
router.put("/:id", jwtAuth, updateExpense);


/**
 * Delete Expense route
 */
router.delete("/:id", jwtAuth , deleteExpense);


module.exports = router;