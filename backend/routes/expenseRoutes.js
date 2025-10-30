

import express from 'express';

import { protect } from '../middleware/authMiddleware.js';

import { addExpense, deleteExpense, downloadExpenseExcel, getAllExpense } from '../controller/ExpenseController.js';




const expenseRouter = express.Router();

expenseRouter.post("/add",protect, addExpense)
expenseRouter.get("/get",protect, getAllExpense)
expenseRouter.delete("/:id",protect, deleteExpense)
expenseRouter.get("/downloadexcel",protect, downloadExpenseExcel)








export default expenseRouter;