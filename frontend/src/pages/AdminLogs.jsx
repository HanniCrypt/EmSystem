import axios from "axios";
import React, { useEffect, useState } from "react";

const API_URL = "http://localhost/emsystem/backend/index.php?action=";

const CustomDropdown = ({ value, onChange, options, label, icon }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <div 
        className="bg-white rounded-xl shadow-sm p-2 flex items-center gap-3 border border-gray-200 hover:border-gray-900 transition-all duration-200 cursor-pointer"
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

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  
  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white border-t border-gray-100">
      <div className="flex justify-between flex-1 sm:hidden">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200
            ${currentPage === 1 
              ? 'text-gray-300 bg-gray-50 cursor-not-allowed' 
              : 'text-white bg-gray-900 hover:bg-gray-800 shadow-sm hover:shadow-md'
            }`}
        >
          Previous
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200
            ${currentPage === totalPages 
              ? 'text-gray-300 bg-gray-50 cursor-not-allowed' 
              : 'text-white bg-gray-900 hover:bg-gray-800 shadow-sm hover:shadow-md'
            }`}
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing page <span className="font-medium">{currentPage}</span> of{' '}
            <span className="font-medium">{totalPages}</span>
          </p>
        </div>
        <div>
          <nav className="inline-flex gap-2" aria-label="Pagination">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center px-3 py-2 text-sm font-medium rounded-xl transition-all duration-200
                ${currentPage === 1 
                  ? 'text-gray-300 bg-gray-50 cursor-not-allowed' 
                  : 'text-white bg-gray-900 hover:bg-gray-800 shadow-sm hover:shadow-md'
                }`}
            >
              <span className="sr-only">Previous</span>
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            
            {pages.map((page) => (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200
                  ${currentPage === page
                    ? 'z-10 bg-gray-900 text-white shadow-md'
                    : 'text-gray-700 bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-900'
                  }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`relative inline-flex items-center px-3 py-2 text-sm font-medium rounded-xl transition-all duration-200
                ${currentPage === totalPages 
                  ? 'text-gray-300 bg-gray-50 cursor-not-allowed' 
                  : 'text-white bg-gray-900 hover:bg-gray-800 shadow-sm hover:shadow-md'
                }`}
            >
              <span className="sr-only">Next</span>
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

const AdminLogs = () => {
  const [logs, setLogs] = useState([]);
  const [selectedAction, setSelectedAction] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const logsPerPage = 10;

  useEffect(() => {
    const fetchActivityLogs = async () => {
      try {
        const res = await axios.get(`${API_URL}fetchActivityLogs`);
        const sortedLogs = res.data.sort((a, b) => 
          new Date(b.created_at) - new Date(a.created_at)
        );
        setLogs(sortedLogs);
      } catch (error) {
        console.log(error);
      }
    };

    fetchActivityLogs();
  }, []);

  const actions = ["add_user", "delete_user", "update_user"];

  const filteredLogs = logs?.filter(log => selectedAction ? log.action === selectedAction : true);
  const totalPages = Math.ceil(filteredLogs.length / logsPerPage);
  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = filteredLogs.slice(indexOfFirstLog, indexOfLastLog);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Activity Logs</h1>
            <p className="mt-2 text-gray-600">Track all system activities and changes</p>
          </div>
          <div className="flex items-center gap-4">
            <CustomDropdown
              value={selectedAction}
              onChange={(value) => {
                setSelectedAction(value);
                setCurrentPage(1);
              }}
              options={actions}
              label="Actions"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20h9"></path>
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                </svg>
              }
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full whitespace-nowrap">
              <thead>
                <tr className="bg-gray-50/80 backdrop-blur-sm sticky top-0">
                  <th className="px-6 py-5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Log ID</th>
                  <th className="px-6 py-5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">User ID</th>
                  <th className="px-6 py-5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
                  <th className="px-6 py-5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Details</th>
                  <th className="px-6 py-5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Created At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {currentLogs.map((log) => (
                  <tr key={log.log_id} className="hover:bg-gray-50/80 transition-colors duration-200">
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-gray-900">#{log.log_id}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1.5 rounded-xl text-xs font-medium bg-gray-900 text-white shadow-sm">
                        {log.user_id}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-medium shadow-sm ${
                        log.action.toLowerCase().includes('delete') 
                          ? 'bg-red-50 text-red-800 border border-red-100'
                          : log.action.toLowerCase().includes('add') || log.action.toLowerCase().includes('create')
                          ? 'bg-green-50 text-green-800 border border-green-100'
                          : log.action.toLowerCase().includes('update') || log.action.toLowerCase().includes('edit')
                          ? 'bg-blue-50 text-blue-800 border border-blue-100'
                          : 'bg-gray-50 text-gray-800 border border-gray-100'
                      }`}>
                        {log.action}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-700 max-w-md truncate hover:whitespace-normal hover:text-clip hover:overflow-visible">
                        {log.details}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center text-xs text-gray-500 gap-1.5">
                        <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-medium">{log.created_at}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminLogs;
