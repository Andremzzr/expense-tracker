
import express from "express";
const { getExpense, createExpense } = require('../controllers/expensesController')
const router = express.Router();

/**
 * Get expeneses  => later add filter exprenses logic
 */
router.get("/:id", getExpense );


/**
 * Create Expense route
 */
router.post("/", createExpense);


/**
 * Update Expense route
 */
router.put("/:id", function (req, res) {
    res.send(`Update Expenses ${req.params.id}`);
});


/**
 * Delete Expense route
 */
router.delete("/:id", function (req, res) {
    res.send("POST EXPENSE");
});


module.exports = router;