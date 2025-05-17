import axios from "axios";
import React, { useEffect, useState } from "react";


const API_URL = "http://localhost/emsystem/backend/index.php?action=";


const DashboardCard = ({ cardTitle, description }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:scale-105 border border-gray-100">
      <h1 className="text-2xl font-bold text-gray-900 mb-3">{cardTitle}</h1>
      <p className="text-4xl font-bold text-gray-700">{description}</p>
    </div>
  );
};

function Dashboard() {

  const [employeesCount, setEmployeesCount] = useState(0)
  const [adminCount, setAdminCount] = useState(0)
  const [HRCount, setHRCount] = useState(0)
  
  useEffect(() => {
    const getAllUsersCount = async () => {
      const response = await axios(`${API_URL}getAllUsersCount`)

      setAdminCount(response.data[0].totalCount)
      setHRCount(response.data[1].totalCount)
      setEmployeesCount(response.data[2].totalCount)
      
    }

    getAllUsersCount();
  }, [])

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard cardTitle="Total Employees" description={employeesCount} />
        <DashboardCard cardTitle="Admins" description={adminCount} />
        <DashboardCard cardTitle="HR's" description={HRCount} />
      </div>
    </div>
  );
}

export default Dashboard;
