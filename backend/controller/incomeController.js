import Income from "../model/Income.js";
import XLSX from "xlsx";


export const addIncome = async (req, res) => {
  const userId = req.user.id;

  try {
    const { source, amount, date, icon } = req.body;

    if (!source || !amount || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newIncome = new Income({
      userId,
      icon,
      source,
      amount,
      date: new Date(date),
    });

    await newIncome.save();

    res.status(201).json({
      success: true,
      message: "Income added successfully",
      income: newIncome, // ✅ fixed
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllIncome = async(req, res)=>{
     const userId = req.user.id;
    try {
   
    const incomes = await Income.find({ userId }).sort({ date: -1 });

    res.status(200).json({
      success: true,
      incomes,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export const deleteIncome = async(req,res)=>{
      try {
    const { id } = req.params;

    const income = await Income.findOneAndDelete( req.params.id );

    if (!income) {
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

export const downloadIncomeExcel = async (req, res) => {
        const userId = req.user.id;
        console.log(req.user.id);

  try {

 
    const incomes = await Income.find({ userId }).sort({date: -1})

    if (incomes.length === 0) {
      return res.status(404).json({ message: "No income records found" });
    }

    // 2️⃣ Convert to JSON for Excel
    const data = incomes.map((item) => ({
      Source: item.source,
      Amount: item.amount,
   Date:item.date,
    }));

    // 3️⃣ Create a new workbook and sheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Incomes");


    // 5️⃣ Write file
    XLSX.writeFile(workbook, "income_details.xlsx");

    // 6️⃣ Send file as download
  res.download('income_details.xlsx')
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error generating Excel file" });
  }
};