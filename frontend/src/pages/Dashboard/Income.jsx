import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Plus, Download, X } from "lucide-react";
import axiosInstance from "../../Utilis/axiosInstance";
import { API_PATHS } from "../../Utilis/apiPaths";
import { Toaster } from "react-hot-toast";
import { toast } from "react-hot-toast";
const Income = () => {
  const [showModal, setShowModal] = useState(false);
  const [incomeData, setIncomeData] = useState([]);
  const [incomeList, setIncomeList] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    source: "",
    amount: "",
    date: "",
    icon: "💰",
  });

  
  useEffect(() => {
    const fetchIncome = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(API_PATHS.INCOME.GET_ALL_INCOME);
        console.log("Income Data:", response.data.incomes);

        const list = response.data.incomes || [];
        setIncomeList(list);
     
        // ✅ Group income by date for better chart visualization
        const grouped = {};
        list.forEach((item) => {
          const date = item.date?.slice(0, 10);
          if (!grouped[date]) grouped[date] = 0;
          grouped[date] += Number(item.amount);
        });

        const chartData = Object.entries(grouped).map(([date, income]) => ({
          name: date,
          income,
        }));

        setIncomeData(chartData);
      } catch (error) {
        console.error("Error fetching income:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchIncome();
  }, []);

  // ✅ Add Income Function


// Add Income
const handleAddIncome = async (e) => {
  e.preventDefault();

  if (!formData.source || !formData.amount || !formData.date) {
    toast.error("Please fill in all fields");
    return;
  }

  try {
    const response = await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, formData);
    toast.success(response.data.message || "Income added successfully!");

    const newIncome = {
      id: incomeList.length + 1,
      source: formData.source,
      amount: parseFloat(formData.amount),
      date: formData.date,
      icon: formData.icon,
    };

    const updatedList = [...incomeList, newIncome];
    setIncomeList(updatedList);

    // ✅ Update chart dynamically (group by date)
    const grouped = {};
    updatedList.forEach((item) => {
      const date = item.date?.slice(0, 10);
      if (!grouped[date]) grouped[date] = 0;
      grouped[date] += Number(item.amount);
    });

    const updatedChart = Object.entries(grouped).map(([date, income]) => ({
      name: date,
      income,
    }));

    setIncomeData(updatedChart);

    // Reset form
    setFormData({ source: "", amount: "", date: "", icon: "💰" });
    setShowModal(false);
  } catch (error) {
    console.error("Error adding income:", error);
    toast.error("Something went wrong while adding income!");
  }
};

// Download Income Excel
const handleDownload = async () => {
  try {
    const response = await axiosInstance.get(API_PATHS.INCOME.DOWNLOAD_INCOME, {
      responseType: "blob", // important
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "incomes.xlsx");
    document.body.appendChild(link);
    link.click();
    link.remove();

    toast.success("Excel downloaded successfully!");
  } catch (error) {
    console.error("Error downloading Excel:", error);
    toast.error("Failed to download Excel file!");
  }
};



  return (
    <div className="space-y-8">
          <Toaster />
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">Income Overview</h2>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition"
        >
          <Plus size={20} /> Add Income
        </button>
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded-xl shadow">
        {loading ? (
          <p className="text-gray-500 text-center">Loading chart...</p>
        ) : (
         <ResponsiveContainer width="100%" height={300}>
  <BarChart data={incomeData}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <Tooltip />
    <Bar dataKey="income" fill="#4f46e5" radius={[5, 5, 0, 0]} />
  </BarChart>
</ResponsiveContainer>

        )}
      </div>

      {/* Income List */}
      <div className="bg-white p-6 rounded-xl shadow">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-700">All Incomes</h3>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded-lg"
          >
            <Download size={18} /> Download
          </button>
        </div>

        {loading ? (
          <p className="text-gray-500 text-center py-4">Loading incomes...</p>
        ) : incomeList.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No income records found.</p>
        ) : (
          <table className="w-full text-left border-t border-gray-200">
            <thead>
              <tr className="text-gray-600 text-sm">
                <th className="py-2">Source</th>
                <th className="py-2">Amount</th>
                <th className="py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {incomeList.map((item, index) => (
                <tr key={index} className="border-t text-gray-700">
                  <td className="py-3 flex items-center gap-2">
                    <span className="text-2xl">{item.icon || "💰"}</span>
                    {item.source}
                  </td>
                  <td className="py-3 text-green-600 font-medium">
                    ${item.amount}
                  </td>
                  <td className="py-3">{item.date?.slice(0, 10)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] md:w-[400px] rounded-xl p-6 relative shadow-lg">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>

            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Add New Income
            </h3>

            <form onSubmit={handleAddIncome} className="space-y-4">
              {/* Icon Picker */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Select Icon
                </label>
                <div className="grid grid-cols-6 gap-2">
                  {["💼", "💻", "🎁", "🏦", "📈", "💰"].map((icon) => (
                    <button
                      type="button"
                      key={icon}
                      onClick={() => setFormData({ ...formData, icon })}
                      className={`text-2xl border rounded-lg p-2 ${
                        formData.icon === icon
                          ? "border-purple-600 bg-purple-100"
                          : "border-gray-300"
                      }`}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>

              {/* Source */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Income Source
                </label>
                <input
                  type="text"
                  value={formData.source}
                  onChange={(e) =>
                    setFormData({ ...formData, source: e.target.value })
                  }
                  placeholder="e.g. Freelancing"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Amount */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Amount
                </label>
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({ ...formData, amount: e.target.value })
                  }
                  placeholder="e.g. 500"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg mt-4 transition"
              >
                Add Income
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Income;
