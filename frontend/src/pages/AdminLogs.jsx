import axios from "axios";
import React, { useEffect, useState } from "react";

const API_URL = "http://localhost/emsystem/backend/index.php?action=";

const CustomDropdown = ({ value, onChange, options, label, icon }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <div 
        className="bg-white rounded-xl shadow-sm p-2 flex items-center gap-3 border border-gray-100 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="px-3 py-2 bg-gray-50 rounded-lg">
          {icon}
        </div>
        <div className="min-w-[200px] px-3 py-2 text-sm text-gray-700 font-medium">
          {value || `All ${label}`}
          <svg className="h-5 w-5 text-gray-400 absolute right-4 top-1/2 transform -translate-y-1/2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      
      {isOpen && (
        <>
          <div 
            className="fixed inset-0" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
            <div 
              className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm text-gray-700"
              onClick={() => {
                onChange("");
                setIsOpen(false);
              }}
            >
              All {label}
            </div>
            {options.map((option) => (
              <div
                key={option}
                className="px-4 py-2 cursor-pointer text-sm text-gray-700 hover:bg-gray-50"
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
              >
                {option}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const AdminLogs = () => {
  const [logs, setLogs] = useState([]);
  const [selectedAction, setSelectedAction] = useState("");

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

  const actions = ["add_user", "delete_user", "update_user"];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="px-6 py-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Activity Logs</h1>
            <p className="mt-2 text-gray-600">Track all system activities and changes</p>
          </div>
          <div className="flex items-center gap-4">
            <CustomDropdown
              value={selectedAction}
              onChange={setSelectedAction}
              options={actions}
              label="Actions"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3zm1 0v2.586l4.707 4.707A1 1 0 019 11v4.586l1-1V11a1 1 0 01.293-.707L15 5.586V3H4z" />
                </svg>
              }
            />
          </div>
        </div>
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
                {logs
                  ?.filter(log => selectedAction ? log.action === selectedAction : true)
                  .map((log) => (
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
