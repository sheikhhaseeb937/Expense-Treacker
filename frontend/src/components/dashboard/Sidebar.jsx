import React from "react";
import { LayoutDashboard, TrendingUp, Wallet, LogOut } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {  Toaster } from "react-hot-toast";
const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/dashboard" },
    { name: "Income", icon: <TrendingUp size={20} />, path: "/income" },
    { name: "Expense", icon: <Wallet size={20} />, path: "/expense" },
  ];



const handleLogout = () => {



    localStorage.clear();
    navigate("/login");

};


  return (
    <div className="w-64 bg-purple-700 text-white flex flex-col p-6">
          <Toaster />
      <h1 className="text-xl font-bold mb-10">💰 Expense Tracker</h1>

      <ul className="space-y-4 flex-1">
        {menuItems.map((item) => (
          <li key={item.name}>
            <Link
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                location.pathname === item.path
                  ? "bg-purple-500"
                  : "hover:bg-purple-600"
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-red-600 transition"
      >
        <LogOut size={20} />
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
