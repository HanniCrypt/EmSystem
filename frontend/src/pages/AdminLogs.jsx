import axios from "axios";
import React, { useEffect, useState } from "react";

const API_URL = "http://localhost/emsystem/backend/index.php?action=";

const AdminLogs = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchActivityLogs = async () => {
      try {
        const res = await axios.get(`${API_URL}fetchActivityLogs`);
        setLogs(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchActivityLogs();
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="px-6 py-8 mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Activity Logs</h1>
        <p className="mt-2 text-gray-600">Track all system activities and changes</p>
      </div>

      <div className="px-6">
        <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Log ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">User ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Action</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Details</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Created At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {logs?.map((log) => (
                  <tr key={log.log_id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-600">{log.log_id}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-purple-50 text-purple-700">
                        {log.user_id}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        log.action.toLowerCase().includes('delete') 
                          ? 'bg-red-50 text-red-700'
                          : log.action.toLowerCase().includes('add') || log.action.toLowerCase().includes('create')
                          ? 'bg-green-50 text-green-700'
                          : log.action.toLowerCase().includes('update') || log.action.toLowerCase().includes('edit')
                          ? 'bg-blue-50 text-blue-700'
                          : 'bg-gray-50 text-gray-700'
                      }`}>
                        {log.action}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-md">
                      <div className="truncate">
                        {log.details}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center text-xs text-gray-500">
                        <svg className="w-4 h-4 mr-1.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {log.created_at}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogs;
