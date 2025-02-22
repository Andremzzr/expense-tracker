
import express from "express";
const { getExpense, createExpense, updateExpense } = require('../controllers/expensesController')
const router = express.Router();

/**
 * Get expeneses 
 */
router.get("/:id", getExpense );


/**
 * Create Expense route
 */
router.post("/", createExpense);


/**
 * Update Expense route
 */
router.put("/:id", updateExpense);


/**
 * Delete Expense route
 */
router.delete("/:id", function (req, res) {
    res.send("POST EXPENSE");
});


module.exports = router;