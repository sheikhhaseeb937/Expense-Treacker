import React, { useEffect, useState } from "react";
import { UserCircle } from "lucide-react";
import Sidebar from "./Sidebar";
import axiosInstance from "../../Utilis/axiosInstance";
import { API_PATHS } from "../../Utilis/apiPaths";

const DashboardLayout = ({ children }) => {
  const [user, setUser] = useState(null);      
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);
        console.log("User info:", response.data);

        
        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user info:", error);
      } finally {
        setLoading(false); 
      }
    };

    getUser();
  }, []);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <div className="flex justify-between items-center p-4 bg-white shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
          <div className="flex items-center gap-3">
            <span className="font-medium text-gray-700">
              Hi, {loading ? "Loading..." : user?.fullName} 👋
            </span>
            <UserCircle size={36} className="text-gray-500" />
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
