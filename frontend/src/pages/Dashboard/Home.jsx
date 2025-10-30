import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import axiosInstance from "../../Utilis/axiosInstance";
import { API_PATHS } from "../../Utilis/apiPaths";

const COLORS = ["#4f46e5", "#ef4444", "#f59e0b", "#10b981", "#8b5cf6"];

const Home = () => {
  const [overviewData, setOverviewData] = useState([]);
  const [last30DaysExpense, setLast30DaysExpense] = useState([]);
  const [last30DaysIncome, setLast30DaysIncome] = useState([]);
  const [expenseList, setExpenseList] = useState([]);
  const [incomeList, setIncomeList] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchDashboardData = async () => {
      
      try {
        setLoading(true); 
        const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);
        const data = response.data;
        console.log("Dashboard API:", data);

        setOverviewData([
          { name: "Income", value: data.totalIncome || 0 },
          { name: "Expense", value: data.totalExpenses || 0 },
        ]);

        setLast30DaysExpense(
          (data.last30DaysExpenses?.transactions || []).map((item, index) => ({
            name: item.date || `Day ${index + 1}`,
            expense: item.amount,
          }))
        );

        setLast30DaysIncome(
          (data.last60DaysIncome?.transactions || []).map((item, index) => ({
            name: item.date || `Day ${index + 1}`,
            income: item.amount,
          }))
        );

        setExpenseList(data.last30DaysExpenses?.transactions || []);
        setIncomeList(data.last60DaysIncome?.transactions || []);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchDashboardData();
  }, []);

  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="text-gray-500 text-sm">Total Balance</h3>
          <p className="text-2xl font-semibold mt-1">
            ${overviewData.length > 0 ? overviewData[0].value - overviewData[1].value : 0}
          </p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="text-gray-500 text-sm">Total Income</h3>
          <p className="text-2xl font-semibold mt-1 text-green-600">
            ${overviewData.find((d) => d.name === "Income")?.value || 0}
          </p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="text-gray-500 text-sm">Total Expense</h3>
          <p className="text-2xl font-semibold mt-1 text-red-500">
            ${overviewData.find((d) => d.name === "Expense")?.value || 0}
          </p>
        </div>
      </div>

    
      <div className="bg-white p-5 rounded-xl shadow">
        <h4 className="text-gray-700 font-semibold mb-4">Financial Overview</h4>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={overviewData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              dataKey="value"
            >
              {overviewData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow p-5">
          <h4 className="text-gray-700 font-semibold mb-4">Last 30 Days Expense</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={last30DaysExpense}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <Tooltip />
              <Bar dataKey="expense" fill="#ef4444" name="Expense" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h4 className="text-gray-700 font-semibold mb-4">All Expenses</h4>
          <ul className="divide-y divide-gray-200">
            {expenseList.map((item, i) => (
              <li key={i} className="py-3 flex justify-between">
                <span>{item.category || item.name}</span>
                <span className="text-red-500">- ${item.amount}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Income Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow p-5">
          <h4 className="text-gray-700 font-semibold mb-4">Income Overview</h4>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={incomeList}
                dataKey="amount"
                cx="50%"
                cy="50%"
                outerRadius={80}
              >
                {incomeList.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h4 className="text-gray-700 font-semibold mb-4">All Incomes</h4>
          <ul className="divide-y divide-gray-200">
            {incomeList.map((item, i) => (
              <li key={i} className="py-3 flex justify-between">
                <span>{item.source || item.name}</span>
                <span className="text-green-600">+ ${item.amount}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
