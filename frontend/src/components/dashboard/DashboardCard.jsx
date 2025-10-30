import React from "react";

const DashboardCard = ({ title, amount }) => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-6 text-center w-full">
      <h3 className="text-gray-500 text-sm">{title}</h3>
      <p className="text-2xl font-semibold text-violet-600 mt-2">{amount}</p>
    </div>
  );
};

export default DashboardCard;
