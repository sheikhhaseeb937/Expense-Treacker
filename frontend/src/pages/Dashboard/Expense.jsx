import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { PlusCircle, Download } from "lucide-react";
import axiosInstance from "../../Utilis/axiosInstance";
import { API_PATHS } from "../../Utilis/apiPaths";
import { Toaster } from "react-hot-toast";
 import { toast } from "react-hot-toast";
const Expense = () => {
  const [showModal, setShowModal] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({
    icon: "💰",
    category: "",
    amount: "",
    date: "",
  });

  // ✅ Fetch all expenses
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.EXPENSE.GET_ALL_EXPENSE);
        console.log( response.data.expense);

        // assuming backend returns { data: [...] }
        setExpenses(response.data.expense || []);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

    fetchExpenses();
  }, []);

  // ✅ Add new expense


// Add Expense
const handleAddExpense = async () => {
  if (!newExpense.category || !newExpense.amount || !newExpense.date) {
    toast.error("Please fill all fields!");
    return;
  }

  try {
    const response = await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, newExpense);
    toast.success(response.data.message || "Expense added successfully!");

    // Refresh list
    setExpenses((prev) => [...prev, newExpense]);
    setNewExpense({ icon: "💰", category: "", amount: "", date: "" });
    setShowModal(false);
  } catch (error) {
    console.error("Error adding expense:", error);
    toast.error("Something went wrong while adding expense!");
  }
};

// Download Excel
const handleDownload = async () => {
  try {
    const response = await axiosInstance.get(API_PATHS.EXPENSE.DOWNLOAD_EXPENSE, {
      responseType: "arraybuffer", // Important for Excel
    });

    const blob = new Blob([response.data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "expenses.xlsx");
    document.body.appendChild(link);
    link.click();
    link.remove();

    toast.success("Excel downloaded successfully!");
  } catch (error) {
    console.error("Error downloading Excel:", error);
    toast.error("Failed to download Excel file!");
  }
};

  // ✅ Prepare data for chart
  const chartData = expenses.map((exp) => ({
    day: exp.date?.slice(5, 10) || "N/A",
    expense: exp.amount || 0,
  }));

  return (
    <div className="relative p-6 bg-gray-50 min-h-screen">
          <Toaster />
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Expense Overview</h2>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700"
        >
          <PlusCircle className="w-5 h-5" /> Add Expense
        </button>
      </div>

      {/* Line Chart */}
      <div className="bg-white p-6 rounded-2xl shadow mb-8">
        <h3 className="text-lg font-medium mb-4">Last 30 Days Expense</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={chartData}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="expense"
              stroke="#8b5cf6"
              strokeWidth={3}
              dot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Expense List */}
      <div className="bg-white p-6 rounded-2xl shadow mb-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">All Expenses</h3>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
          >
            <Download className="w-5 h-5" /> Download
          </button>
        </div>

        <div className="divide-y divide-gray-100">
          {expenses.map((exp, index) => (
            <div key={index} className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{exp.icon}</span>
                <span className="font-medium text-gray-700">{exp.category}</span>
              </div>
              <div className="flex items-center gap-8">
                <span className="text-gray-600">${exp.amount}</span>
                <span className="text-gray-400 text-sm">
                  {exp.date?.slice(0, 10)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-[400px]">
            <h3 className="text-lg font-semibold mb-4">Add Expense</h3>

            <label className="block text-sm font-medium text-gray-600 mb-1">
              Pick Icon
            </label>
            <input
              type="text"
              placeholder="e.g. 🍔 or 💡"
              value={newExpense.icon}
              onChange={(e) =>
                setNewExpense({ ...newExpense, icon: e.target.value })
              }
              className="w-full border p-2 rounded-lg mb-3"
            />

            <label className="block text-sm font-medium text-gray-600 mb-1">
              Category
            </label>
            <input
              type="text"
              placeholder="Enter category"
              value={newExpense.category}
              onChange={(e) =>
                setNewExpense({ ...newExpense, category: e.target.value })
              }
              className="w-full border p-2 rounded-lg mb-3"
            />

            <label className="block text-sm font-medium text-gray-600 mb-1">
              Amount
            </label>
            <input
              type="number"
              placeholder="Enter amount"
              value={newExpense.amount}
              onChange={(e) =>
                setNewExpense({ ...newExpense, amount: e.target.value })
              }
              className="w-full border p-2 rounded-lg mb-3"
            />

            <label className="block text-sm font-medium text-gray-600 mb-1">
              Date
            </label>
            <input
              type="date"
              value={newExpense.date}
              onChange={(e) =>
                setNewExpense({ ...newExpense, date: e.target.value })
              }
              className="w-full border p-2 rounded-lg mb-4"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleAddExpense}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Add Expense
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Expense;
