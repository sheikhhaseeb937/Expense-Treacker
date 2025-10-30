

import express from 'express';

import { protect } from '../middleware/authMiddleware.js';
import { addIncome, downloadIncomeExcel, getAllIncome } from '../controller/incomeController.js';



const incomeRouter = express.Router();

incomeRouter.post("/add",protect, addIncome)
incomeRouter.get("/get",protect, getAllIncome)
incomeRouter.delete("/:id",protect, getAllIncome)
incomeRouter.get("/downloadexcel",protect, downloadIncomeExcel)








export default incomeRouter;