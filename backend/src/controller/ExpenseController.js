import Expense from "../model/Expense.js";
import XLSX from "xlsx";



export const addExpense = async (req, res) => {
  const userId = req.user.id;

  try {
    const { category, amount, date, icon } = req.body;

    if (!category || !amount || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newExpense = new Expense({
      userId,
      icon,
  category,
      amount,
      date: new Date(date),
    });

    await newExpense.save();

    res.status(201).json({
      success: true,
      message: "Income added successfully",
      expense: newExpense, // ✅ fixed
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllExpense = async(req, res)=>{
     const userId = req.user.id;
    try {
   
    const expense = await Expense.find({ userId }).sort({ date: -1 });

    res.status(200).json({
      success: true,
      expense,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export const deleteExpense = async(req,res)=>{
      try {
    const { id } = req.params;

    const expense = await Expense.findOneAndDelete( req.params.id );

    if (!expense) {
      return res.status(404).json({ message: "Income not found or not authorized" });
    }

    res.status(200).json({
      success: true,
      message: "Income deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export const downloadExpenseExcel = async (req, res) => {
  try {
    const userId = req.user.id;

    const expenses = await Expense.find({ userId }).sort({ date: -1 });
    if (!expenses.length) {
      return res.status(404).json({ message: "No expense records found" });
    }

    const data = expenses.map((item) => ({
      Category: item.category || item.source,
      Amount: item.amount,
      Date: new Date(item.date).toLocaleDateString(),
    }));

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Expenses");

    // ✅ Write to /tmp folder
   
    XLSX.writeFile(workbook, "expense_details.xlsx");

    // ✅ Send file as download
    res.download( "expense_details.xlsx");
  } catch (error) {
    console.error("Error generating Excel:", error);
    res.status(500).json({ message: "Error generating Excel file" });
  }
};
