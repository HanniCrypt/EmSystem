import axios from "axios";
import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

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
                key={typeof option === 'object' ? option.dept_id : option}
                className="px-4 py-2 cursor-pointer text-sm text-gray-700 hover:bg-gray-50"
                onClick={() => {
                  onChange(typeof option === 'object' ? option.dept_name : option);
                  setIsOpen(false);
                }}
              >
                {typeof option === 'object' ? option.dept_name : option}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const StatusDropdown = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const statuses = [
    { label: "All Status", value: "" },
    { label: "Enabled", value: "0" },
    { label: "Disabled", value: "1" }
  ];

  return (
    <div className="relative">
      <div 
        className="bg-white rounded-xl shadow-sm p-2 flex items-center gap-3 border border-gray-100 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="px-3 py-2 bg-gray-50 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="min-w-[150px] px-3 py-2 text-sm text-gray-700 font-medium">
          {statuses.find(s => s.value === value)?.label || "All Status"}
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
            {statuses.map((status) => (
              <div
                key={status.value}
                className="px-4 py-2 cursor-pointer text-sm text-gray-700 hover:bg-gray-50"
                onClick={() => {
                  onChange(status.value);
                  setIsOpen(false);
                }}
              >
                {status.label}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const Toast = ({ message, type, onClose }) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const icons = {
    success: (
      <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
    error: (
      <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    )
  };

  const colors = {
    success: "bg-green-50 border-green-200",
    error: "bg-red-50 border-red-200"
  };

  return (
    <div className="fixed top-4 right-4 z-50 animate-fade-in-down">
      <div className={`rounded-xl shadow-lg ${colors[type]} border backdrop-blur-md p-4 max-w-md`}>
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0">
            {icons[type]}
          </div>
          <div className="flex-1 ml-3">
            <p className={`text-sm font-medium ${type === 'success' ? 'text-green-800' : 'text-red-800'}`}>
              {message}
            </p>
          </div>
          <div className="flex-shrink-0">
            <button
              onClick={onClose}
              className={`inline-flex rounded-md p-1.5 focus:outline-none transition-colors
                ${type === 'success' ? 'text-green-500 hover:bg-green-100' : 'text-red-500 hover:bg-red-100'}`}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const DeleteConfirmationDialog = ({ isOpen, onClose, onConfirm, user }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 backdrop-blur-sm bg-gray-900/30 transition-all duration-300"
        onClick={onClose}
      />
      <div className="relative w-96 transform transition-all duration-300 scale-100">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200/50 p-6 overflow-hidden">
          <div className="relative">
            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-gray-100/50 to-transparent rounded-full -translate-x-16 -translate-y-16" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-gray-100/50 to-transparent rounded-full translate-x-16 translate-y-16" />
            
            {/* Content */}
            <div className="relative text-center">
              <div className="flex justify-center transform hover:scale-105 transition-transform duration-200">
                <svg className="w-12 h-12 text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <h3 className="text-xl leading-6 font-bold text-gray-900 mb-2">
                Confirm Delete User
              </h3>
              <div className="mt-2 px-4">
                <p className="text-sm text-gray-600">
                  Are you sure you want to delete user "{user?.username}"? This action cannot be undone.
                </p>
                {user?.role === 'admin' && (
                  <p className="mt-2 text-sm text-red-600 font-medium">
                    Warning: You are about to delete an admin user!
                  </p>
                )}
              </div>
              <div className="flex justify-center gap-4 mt-6">
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-white hover:bg-gray-50 text-gray-800 text-sm font-medium rounded-xl transition-all duration-200 border border-gray-200 hover:border-gray-300 hover:shadow-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={onConfirm}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  Delete User
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const UpdateConfirmationDialog = ({ isOpen, onClose, onConfirm, user }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      <div 
        className="absolute inset-0 backdrop-blur-sm bg-gray-900/30 transition-all duration-300"
        onClick={onClose}
      />
      <div className="relative w-96 transform transition-all duration-300 scale-100">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200/50 p-6 overflow-hidden">
          <div className="relative">
            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-gray-100/50 to-transparent rounded-full -translate-x-16 -translate-y-16" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-gray-100/50 to-transparent rounded-full translate-x-16 translate-y-16" />
            
            {/* Content */}
            <div className="relative text-center">
              <div className="flex justify-center transform hover:scale-105 transition-transform duration-200">
                <svg className="w-12 h-12 text-blue-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              <h3 className="text-xl leading-6 font-bold text-gray-900 mb-2">
                Confirm Update User
              </h3>
              <div className="mt-2 px-4">
                <p className="text-sm text-gray-600">
                  Are you sure you want to update user "{user?.username}"?
                </p>
              </div>
              <div className="flex justify-center gap-4 mt-6">
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-white hover:bg-gray-50 text-gray-800 text-sm font-medium rounded-xl transition-all duration-200 border border-gray-200 hover:border-gray-300 hover:shadow-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={onConfirm}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  Update User
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DisableConfirmationDialog = ({ isOpen, onClose, onConfirm, user }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 backdrop-blur-sm bg-gray-900/30 transition-all duration-300"
        onClick={onClose}
      />
      <div className="relative w-96 transform transition-all duration-300 scale-100">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200/50 p-6 overflow-hidden">
          <div className="relative">
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-gray-100/50 to-transparent rounded-full -translate-x-16 -translate-y-16" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-gray-100/50 to-transparent rounded-full translate-x-16 translate-y-16" />
            <div className="relative text-center">
              <div className="flex justify-center transform hover:scale-105 transition-transform duration-200">
                <svg className="w-12 h-12 text-yellow-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-xl leading-6 font-bold text-gray-900 mb-2">
                {user?.is_disabled ? 'Enable User' : 'Disable User'}
              </h3>
              <div className="mt-2 px-4">
                <p className="text-sm text-gray-600">
                  Are you sure you want to {user?.is_disabled ? 'enable' : 'disable'} user "{user?.username}"?
                </p>
              </div>
              <div className="flex justify-center gap-4 mt-6">
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-white hover:bg-gray-50 text-gray-800 text-sm font-medium rounded-xl transition-all duration-200 border border-gray-200 hover:border-gray-300 hover:shadow-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={onConfirm}
                  className={`px-4 py-2 text-white text-sm font-medium rounded-xl transition-all duration-200 shadow-sm hover:shadow-md ${
                    user?.is_disabled 
                      ? 'bg-green-600 hover:bg-green-700' 
                      : 'bg-yellow-600 hover:bg-yellow-700'
                  }`}
                >
                  {user?.is_disabled ? 'Enable User' : 'Disable User'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
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

function AdminAllUsersList() {
  const { user: currentUser } = useOutletContext();

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editModal, setEditModal] = useState(false);
  const [disableModal, setDisableModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [userToDisable, setUserToDisable] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const [selectedRole, setSelectedRole] = useState("");
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const fetchDepartments = async () => {
    try {
      const response = await axios.post(`${API_URL}departments`);

      setDepartments(response.data);
    } catch (error) {
      console.error("Failed to fetch departments", error);
    }
  };

  const fetchAllUsers = async () => {
    const response = await axios.post(`${API_URL}fetchAllUsers`);
    setUsers(response.data);
  };

  useEffect(() => {
    fetchAllUsers();
    fetchDepartments();
  }, []);

  const handleDisableClick = (user) => {
    setUserToDisable(user);
    setDisableModal(true);
  };

  const handleDisable = async () => {
    try {
      const response = await axios.post(
        `${API_URL}${userToDisable.is_disabled ? 'enableEmployee' : 'removeEmployee'}`,
        {
          user_id: userToDisable.user_id,
        },
        { withCredentials: true }
      );

      if (response.data.type === "success") {
        setToast({
          show: true,
          message: `Successfully ${userToDisable.is_disabled ? 'enabled' : 'disabled'} user "${userToDisable.username}"`,
          type: "success"
        });
        fetchAllUsers();
      } else {
        setToast({
          show: true,
          message: response.data.message || `Failed to ${userToDisable.is_disabled ? 'enable' : 'disable'} user`,
          type: "error"
        });
      }
    } catch (error) {
      console.error("Error updating user status:", error);
      setToast({
        show: true,
        message: `An error occurred while ${userToDisable.is_disabled ? 'enabling' : 'disabling'} the user`,
        type: "error"
      });
    }
    setDisableModal(false);
    setUserToDisable(null);
  };

  const handleEditModal = async (employee) => {
    setEditModal(true);
    setSelectedUser(employee);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedUser((prev) => ({
          ...prev,
          avatar: reader.result.split(",")[1],
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditEmployee = async (e) => {
    e.preventDefault();
    setUpdateModal(true);
  };

  const handleConfirmUpdate = async () => {
    try {
      const response = await axios.post(
        `${API_URL}updateEmployee`,
        {
          user_id: selectedUser.user_id,
          avatar: selectedUser.avatar,
          username: selectedUser.username,
          newPass: selectedUser.password,
          dept_id: selectedUser.dept_id,
          role: selectedUser.role,
        },
        { withCredentials: true }
      );

      if (response.data.type === "success") {
        setToast({
          show: true,
          message: `Successfully updated user "${selectedUser.username}"`,
          type: "success"
        });
        setEditModal(false);
        fetchAllUsers();
      } else {
        setToast({
          show: true,
          message: response.data.message || "Failed to update user",
          type: "error"
        });
      }
    } catch (error) {
      console.error("Error updating user:", error);
      setToast({
        show: true,
        message: "An error occurred while updating the user",
        type: "error"
      });
    }
    setUpdateModal(false);
  };

  const roles = [...new Set(users.map((u) => u.role))];

  const filteredUsers = users?.filter(
    (user) =>
      (selectedDepartment
        ? user.dept_name === selectedDepartment
        : true) &&
      (selectedRole ? user.role === selectedRole : true) &&
      (searchQuery
        ? user.username.toLowerCase().includes(searchQuery.toLowerCase())
        : true) &&
      (selectedStatus !== ""
        ? user.is_disabled.toString() === selectedStatus
        : true)
  ).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="max-w-7xl mx-auto">
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}
      <DisableConfirmationDialog
        isOpen={disableModal}
        onClose={() => {
          setDisableModal(false);
          setUserToDisable(null);
        }}
        onConfirm={handleDisable}
        user={userToDisable}
      />
      <UpdateConfirmationDialog
        isOpen={updateModal}
        onClose={() => setUpdateModal(false)}
        onConfirm={handleConfirmUpdate}
        user={selectedUser}
      />
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">All Users</h1>
          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div className="relative">
              <div className="bg-white rounded-xl shadow-sm p-2 flex items-center gap-3 border border-gray-100">
                <div className="px-3 py-2 bg-gray-50 rounded-lg">
                  <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search username"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-[150px] px-3 py-2 text-sm text-gray-700 bg-transparent focus:outline-none"
                />
              </div>
            </div>

            <CustomDropdown
              value={selectedDepartment}
              onChange={setSelectedDepartment}
              options={departments}
              label="Departments"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"></path>
                </svg>
              }
            />
            <CustomDropdown
              value={selectedRole}
              onChange={setSelectedRole}
              options={roles}
              label="Roles"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              }
            />
            <StatusDropdown
              value={selectedStatus}
              onChange={setSelectedStatus}
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-gray-100 to-gray-200 border-b border-gray-200">
                  <th className="px-6 py-5 text-center text-sm font-bold text-gray-800 uppercase tracking-wider w-28">
                    <div className="flex items-center justify-center gap-2">
                      <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Avatar</span>
                    </div>
                  </th>
                  <th className="px-6 py-5 text-center text-sm font-bold text-gray-800 uppercase tracking-wider">
                    <div className="flex items-center justify-center gap-2">
                      <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>Username</span>
                    </div>
                  </th>
                  <th className="px-6 py-5 text-center text-sm font-bold text-gray-800 uppercase tracking-wider">
                    <div className="flex items-center justify-center gap-2">
                      <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>Role</span>
                    </div>
                  </th>
                  <th className="px-6 py-5 text-center text-sm font-bold text-gray-800 uppercase tracking-wider">
                    <div className="flex items-center justify-center gap-2">
                      <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <span>Department</span>
                    </div>
                  </th>
                  <th className="px-6 py-5 text-center text-sm font-bold text-gray-800 uppercase tracking-wider">
                    <div className="flex items-center justify-center gap-2">
                      <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>Joined</span>
                    </div>
                  </th>
                  <th className="px-6 py-5 text-center text-sm font-bold text-gray-800 uppercase tracking-wider">
                    <div className="flex items-center justify-center gap-2">
                      <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                      </svg>
                      <span>Actions</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentUsers.map((user, index) => (
                  <tr 
                    key={user.user_id}
                    className={`hover:bg-blue-50/50 transition-colors duration-200 ${
                      index % 2 === 0 ? 'bg-gray-50/50' : 'bg-white'
                    }`}
                  >
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="flex justify-center">
                        {user.avatar ? (
                          <div className="relative group">
                            <img
                              src={`data:image/jpeg;base64,${user.avatar}`}
                              alt="Profile"
                              className="w-16 h-16 rounded-xl object-cover shadow-md border-2 border-gray-100 group-hover:border-blue-200 transition-all duration-200 transform group-hover:scale-105"
                            />
                            <div className="hidden group-hover:block absolute top-0 left-0 w-16 h-16 rounded-xl bg-black/20 transition-all duration-200" />
                          </div>
                        ) : (
                          <div className="relative group">
                            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center text-3xl font-bold text-blue-600 shadow-md border-2 border-gray-100 group-hover:border-blue-200 transition-all duration-200 transform group-hover:scale-105">
                              {user.username?.charAt(0).toUpperCase()}
                            </div>
                            <div className="hidden group-hover:block absolute top-0 left-0 w-16 h-16 rounded-xl bg-black/10 transition-all duration-200" />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-base font-semibold text-gray-900 text-center">{user.username}</span>
                        {user.is_disabled === 1 && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-50 text-red-700 ring-1 ring-red-700/10">
                            Disabled
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="flex justify-center">
                        <span className={`
                          inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium
                          ${user.role === 'admin' ? 'bg-purple-50 text-purple-700 ring-1 ring-purple-700/10' :
                            user.role === 'hr' ? 'bg-blue-50 text-blue-700 ring-1 ring-blue-700/10' :
                            'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-700/10'}
                        `}>
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="flex justify-center">
                        <span className="inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium bg-gray-50 text-gray-600 ring-1 ring-gray-500/10">
                          {user?.dept_name || "No Department"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="text-base text-gray-500 text-center">
                        {new Date(user.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="flex justify-center gap-3">
                        {user.user_id === currentUser.user_id ? (
                          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold bg-blue-100 text-blue-800">
                            Current User
                          </span>
                        ) : (
                          <>
                            <button
                              onClick={() => handleEditModal({ ...user, password: "" })}
                              className={`p-2.5 ${user.is_disabled === 1 ? 'text-gray-400 cursor-not-allowed opacity-50' : 'text-blue-600 hover:bg-blue-100'} rounded-lg transition-all duration-200 hover:scale-110`}
                              title={user.is_disabled === 1 ? "Enable user first to edit" : "Edit User"}
                              disabled={user.is_disabled === 1}
                            >
                              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleDisableClick(user)}
                              className={`p-2.5 rounded-lg transition-colors ${
                                user.is_disabled === 1 
                                  ? 'text-green-600 hover:bg-green-50' 
                                  : 'text-yellow-600 hover:bg-yellow-50'
                              }`}
                              title={user.is_disabled === 1 ? "Enable User" : "Disable User"}
                            >
                              {user.is_disabled === 1 ? (
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              ) : (
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                              )}
                            </button>
                          </>
                        )}
                      </div>
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

      {/* Edit Modal */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center ${
          editModal ? "" : "hidden"
        }`}
        aria-modal="true"
        role="dialog"
      >
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
          onClick={() => setEditModal(false)}
          aria-hidden="true"
        />
        <div className="relative z-50 w-full max-w-2xl rounded-2xl bg-white p-8 shadow-xl">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-semibold text-gray-800">Edit User</h3>
            <button
              onClick={() => setEditModal(false)}
              className="p-2 text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-100 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleEditEmployee} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column - Avatar and Role */}
              <div className="space-y-6">
                <div>
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-40 h-40 rounded-2xl bg-gray-50 ring-4 ring-gray-100 flex items-center justify-center overflow-hidden">
                      {selectedUser?.avatar ? (
                        <img
                          src={`data:image/jpeg;base64,${selectedUser.avatar}`}
                          alt="Avatar"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-6xl font-bold text-gray-300">
                          {selectedUser?.username?.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div className="w-full">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Change Avatar
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full px-4 py-2.5 text-sm text-gray-700 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
                      />
                    </div>
                  </div>
                </div>

                {/* Role Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role
                  </label>
                  <select
                    name="role"
                    value={selectedUser?.role || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 text-sm text-gray-700 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-700 hover:border-gray-300 transition-colors bg-white"
                  >
                    <option value="">Select Role</option>
                    <option value="admin">Admin</option>
                    <option value="hr">HR</option>
                    <option value="employee">Employee</option>
                  </select>
                </div>
              </div>

              {/* Right Column - Other Fields */}
              <div className="space-y-6">
                {/* Username Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={selectedUser?.username}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 text-sm text-gray-700 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-700 hover:border-gray-300 transition-colors"
                  />
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={selectedUser?.password}
                    onChange={handleChange}
                    placeholder="Leave blank to keep current password"
                    className="w-full px-4 py-2.5 text-sm text-gray-700 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-700 hover:border-gray-300 transition-colors"
                  />
                </div>

                {/* Department Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Department
                  </label>
                  <select
                    name="dept_id"
                    value={selectedUser?.dept_id || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 text-sm text-gray-700 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-700 hover:border-gray-300 transition-colors bg-white"
                  >
                    <option value="">Select Department</option>
                    {departments.map((dept) => (
                      <option key={dept.dept_id} value={dept.dept_id}>
                        {dept.dept_name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Current Department Display */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="text-sm text-gray-600">Current Department</div>
                  <div className="font-medium text-gray-900">
                    {selectedUser?.dept_name || "Not Assigned"}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-8 mt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setEditModal(false)}
                className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-xl transition-colors shadow-sm hover:shadow-md"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminAllUsersList;