import axios from "axios";
import React, { useEffect, useState } from "react";

const API_URL = "http://localhost/emsystem/backend/index.php?action=";

const DashboardCard = ({ cardTitle, description, icon }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] border border-gray-100 w-[280px]">
      <div className="space-y-6">
        <div className="inline-flex items-center justify-center p-4 bg-gray-50 rounded-2xl border border-gray-100">
          <div className="text-gray-900">
            {icon}
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">{cardTitle}</h3>
          <p className="text-6xl font-bold text-gray-900 tracking-tight">{description}</p>
        </div>
      </div>
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
    <div className="max-w-7xl mx-auto px-8 py-12">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Dashboard Overview</h1>
        <p className="mt-3 text-gray-600 text-lg">Monitor and manage your organization's statistics</p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-8">
        <DashboardCard 
          cardTitle="Employees" 
          description={employeesCount}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20H7m10-11a3 3 0 11-6 0 3 3 0 016 0zM9 9a3 3 0 11-6 0 3 3 0 016 0zM15 20H5a2 2 0 01-2-2v-1a5 5 0 015-5h4a5 5 0 015 5v1a2 2 0 01-2 2z" />
            </svg>
          }
        />
        <DashboardCard 
          cardTitle="Administrators" 
          description={adminCount}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          }
        />
        <DashboardCard 
          cardTitle="HR Managers" 
          description={HRCount}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          }
        />
      </div>

      {/* Additional dashboard sections can be added here */}
    </div>
  );
}

export default Dashboard;
