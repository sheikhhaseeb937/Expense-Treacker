import React from "react";
import Card_2 from "../../assets/images/loginchart.jpg";
import { LuTrendingUpDown } from "react-icons/lu";

const Authlayout = ({ children }) => {
  return (
    <div className="flex">
      <div className="w-screen h-screen md:w-[60vw] px-12 pt-8 pb-22">
        <h2 className="text-lg font-medium text-black">Expense Tracker</h2>
        {children}
      </div>

      <div className="hidden md:block w-[40vw] h-screen bg-violet-50 bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative">
        <div className="w-48 h-48 rounded-[40px] bg-purple-600 absolute -top-7 -left-5"></div>
        <div className="w-48 h-48 rounded-[40px] border-[20px] border-fuchsia-600 absolute top-[30%] -right-10"></div>
        <div className="w-48 h-48 rounded-[40px] border-violet-500 absolute -bottom-7 -left-50"></div>

        <div className="grid grid-cols-1 z-20 relative">
          <StatsInfoCard
            icon={<LuTrendingUpDown />}
            label="Track Your Income & Expenses"
            value="430,000"
            color="bg-purple-500"
          />
        </div>

        <img src={Card_2} alt="chart" className="absolute bottom-0 right-0 w-full object-cover" />
      </div>
    </div>
  );
};

export default Authlayout;

const StatsInfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="flex gap-6 bg-white p-4 rounded-xl shadow-md shadow-purple-400/10 border border-gray-200/50 z-10">
      <div
        className={`w-12 h-12 flex items-center justify-center text-[25px] text-white ${color} rounded-full drop-shadow-xl`}
      >
        {icon}
      </div>
      <div>
        <h6 className="text-xs text-gray-500 mb-1">{label}</h6>
        <span className="text-[20px] font-semibold">${value}</span>
      </div>
    </div>
  );
};
