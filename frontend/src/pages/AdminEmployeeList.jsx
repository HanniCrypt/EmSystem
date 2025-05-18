import axios from "axios";
import React, { useEffect, useState } from "react";

const API_URL = "http://localhost/emsystem/backend/index.php?action=";

const CustomDropdown = ({ value, onChange, departments }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <div 
        className="bg-white rounded-xl shadow-sm p-2 flex items-center gap-3 border border-gray-100 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="px-3 py-2 bg-gray-50 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3zm1 0v2.586l4.707 4.707A1 1 0 019 11v4.586l1-1V11a1 1 0 01.293-.707L15 5.586V3H4z" />
          </svg>
        </div>
        <div className="min-w-[200px] px-3 py-2 text-sm text-gray-700 font-medium">
          {value || "All Departments"}
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
              All Departments
            </div>
            {departments.map((dept) => (
              <div
                key={dept.dept_id}
                className="px-4 py-2 cursor-pointer text-sm text-gray-700 hover:bg-gray-50"
                onClick={() => {
                  onChange(dept.dept_name);
                  setIsOpen(false);
                }}
              >
                {dept.dept_name}
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

const DeleteConfirmationDialog = ({ isOpen, onClose, onConfirm, employee }) => {
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
                Confirm Delete Employee
              </h3>
              <div className="mt-2 px-4">
                <p className="text-sm text-gray-600">
                  Are you sure you want to delete employee "{employee?.username}"? This action cannot be undone.
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
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  Delete Employee
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const UpdateConfirmationDialog = ({ isOpen, onClose, onConfirm, employee }) => {
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
                Confirm Update Employee
              </h3>
              <div className="mt-2 px-4">
                <p className="text-sm text-gray-600">
                  Are you sure you want to update employee "{employee?.username}"?
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
                  Update Employee
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function AdminEmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  const [searchQuery, setSearchQuery] = useState("");
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");

  const fetchDepartments = async () => {
    try {
      const response = await axios.post(`${API_URL}departments`);

      setDepartments(response.data);
    } catch (error) {
      console.error("Failed to fetch departments", error);
    }
  };
  const fetchAllEmployees = async () => {
    const response = await axios.post(`${API_URL}fetchAllEmployees`);

    setEmployees(response.data);
  };

  useEffect(() => {
    fetchAllEmployees();
    fetchDepartments();
  }, []);

  const handleDeleteClick = (employee) => {
    setEmployeeToDelete(employee);
    setDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      const response = await axios.post(
        `${API_URL}removeEmployee`,
        {
          user_id: employeeToDelete.user_id,
        },
        { withCredentials: true }
      );

      if (response.data.type === "success") {
        setToast({
          show: true,
          message: `Successfully removed employee "${employeeToDelete.username}"`,
          type: "success"
        });
        fetchAllEmployees();
      } else {
        setToast({
          show: true,
          message: response.data.message || "Failed to remove employee",
          type: "error"
        });
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
      setToast({
        show: true,
        message: "An error occurred while removing the employee",
        type: "error"
      });
    }
    setDeleteModal(false);
    setEmployeeToDelete(null);
  };

  const handleEditModal = async (employee) => {
    setEditModal(true);
    setSelectedEmployee(employee);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedEmployee((prev) => ({
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
          user_id: selectedEmployee.user_id,
          avatar: selectedEmployee.avatar,
          username: selectedEmployee.username,
          newPass: selectedEmployee.password,
          dept_id: selectedEmployee.dept_id,
          role: selectedEmployee.role,
        },
        { withCredentials: true }
      );

      if (response.data.type === "success") {
        setToast({
          show: true,
          message: `Successfully updated employee "${selectedEmployee.username}"`,
          type: "success"
        });
        setEditModal(false);
        fetchAllEmployees();
      } else {
        setToast({
          show: true,
          message: response.data.message || "Failed to update employee",
          type: "error"
        });
      }
    } catch (error) {
      console.error("Error updating employee:", error);
      setToast({
        show: true,
        message: "An error occurred while updating the employee",
        type: "error"
      });
    }
    setUpdateModal(false);
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
      <DeleteConfirmationDialog
        isOpen={deleteModal}
        onClose={() => {
          setDeleteModal(false);
          setEmployeeToDelete(null);
        }}
        onConfirm={handleDelete}
        employee={employeeToDelete}
      />
      <UpdateConfirmationDialog
        isOpen={updateModal}
        onClose={() => {
          setUpdateModal(false);
        }}
        onConfirm={handleConfirmUpdate}
        employee={selectedEmployee}
      />
      
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Employees</h1>
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
                  className="w-[200px] px-3 py-2 text-sm text-gray-700 bg-transparent focus:outline-none"
                />
              </div>
            </div>

            {/* Department Filter */}
            <CustomDropdown
              value={selectedDepartment}
              onChange={setSelectedDepartment}
              departments={departments}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {employees
            ?.filter(
              (user) =>
                (selectedDepartment
                  ? user.dept_name === selectedDepartment
                  : true) &&
                (searchQuery
                  ? user.username.toLowerCase().includes(searchQuery.toLowerCase())
                  : true)
            )
            .map((employee) => (
              <div 
                key={employee.user_id} 
                className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200 p-6"
              >
                {/* Avatar Section - Centered */}
                <div className="flex justify-center mb-6">
                  {employee.avatar ? (
                    <img
                      src={`data:image/jpeg;base64,${employee.avatar}`}
                      alt="Profile"
                      className="w-54 h-40 rounded-2xl object-cover shadow-md border-2 border-gray-50"
                    />
                  ) : (
                    <div className="w-48 h-40 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center text-4xl font-bold text-gray-400 shadow-md border-2 border-gray-50">
                      {employee.username?.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>

                {/* Info Section */}
                <div className="space-y-3">
                  {/* Username and Actions Row */}
                  <div className="flex items-center justify-between px-2">
                  <h3 className="text-xl font-semibold text-gray-900">
                      {employee.username}
                    </h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditModal({ ...employee, password: "" })}
                        className="p-2 text-gray-900 hover:bg-gray-50 rounded-xl transition-colors"
                        title="Edit Employee"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDeleteClick(employee)}
                        className="p-2 text-gray-900 hover:bg-gray-50 rounded-xl transition-colors"
                        title="Delete Employee"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* ID */}
                  <div className="px-2 text-sm text-gray-900 font-medium">
                    ID: {employee.user_id}
                  </div>

                  {/* Role */}
                  <div className="px-2">
                    <div className="inline-flex items-center text-sm font-medium text-emerald-600">
                      {employee.role}
                    </div>
                  </div>

                  {/* Department */}
                  <div className="px-2 mt-[-10px]">
                    <div className="inline-flex items-center text-sm font-medium text-purple-700">
                      {employee?.dept_name || "No Department"}
                    </div>
                  </div>

                  {/* Date */}
                  <div className="px-2 text-xs text-gray-900">
                    Joined {new Date(employee.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Modal */}
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
            <h3 className="text-2xl font-semibold text-gray-800">Edit Employee</h3>
            <button
              onClick={() => setEditModal(false)}
              className="p-2 text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-100 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={(e) => handleEditEmployee(e)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column - Avatar and Role */}
              <div className="space-y-6">
                <div>
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-40 h-40 rounded-2xl bg-gray-50 ring-4 ring-gray-100 flex items-center justify-center overflow-hidden">
                      {selectedEmployee?.avatar ? (
                        <img
                          src={`data:image/jpeg;base64,${selectedEmployee?.avatar}`}
                          alt="Avatar"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-6xl font-bold text-gray-300">
                          {selectedEmployee?.username?.charAt(0).toUpperCase()}
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
                    value={selectedEmployee?.role || ""}
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
                    value={selectedEmployee?.username}
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
                    value={selectedEmployee?.password}
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
                    value={selectedEmployee?.dept_id || ""}
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
                    {selectedEmployee?.dept_name || "Not Assigned"}
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

export default AdminEmployeeList;
