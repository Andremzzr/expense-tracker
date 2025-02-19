
import express from "express";
const router = express.Router();


/**
 * Get expeneses  => later add filter exprenses logic
 */
router.get("/:id", function (req, res) {
    res.send(`Get expemse ${req.params.id}`);
});


/**
 * Create Expense route
 */
router.post("/", function (req, res) {
    res.send("POST EXPENSE");
});


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