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

function AdminEmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [editModal, setEditModal] = useState(false);

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

  const handleDelete = async (user_id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        const response = await axios.post(
          `${API_URL}removeEmployee`,
          {
            user_id: user_id,
          },
          { withCredentials: true }
        );

        if (response.data.type === "success") {
          alert(response.data.message);
          fetchAllEmployees();
        } else {
          alert(response.data.message);
          fetchAllEmployees();
        }
      } catch (error) {
        console.error("Error deleting employee:", error);
        alert("Failed to delete employee");
      }
    }
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

    await axios.post(
      `${API_URL}updateEmployee`,
      {
        user_id: selectedEmployee.user_id,
        avatar: selectedEmployee.avatar,
        username: selectedEmployee.username,
        newPass: selectedEmployee.password,
        dept_id: selectedEmployee.dept_id,
      },
      { withCredentials: true }
    );

    setEditModal(false);
    fetchAllEmployees();
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Employee Management</h1>
          <CustomDropdown
            value={selectedDepartment}
            onChange={setSelectedDepartment}
            departments={departments}
          />
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Avatar</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Username</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Department</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Created At</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {employees?.filter(
                    (user) =>
                      (selectedDepartment
                        ? user.dept_name === selectedDepartment
                        : true)
                  ).map((employee) => (
                  <tr key={employee.user_id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        {employee.avatar ? (
                          <img
                            src={`data:image/jpeg;base64,${employee.avatar}`}
                            alt="Profile"
                            className="w-12 h-12 rounded-full object-cover border-2 border-gray-100"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-medium">
                            NA
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{employee.user_id}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-700">{employee.username}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <span className="px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 font-medium">
                        {employee?.dept_name}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{employee.created_at}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                          onClick={() =>
                            handleEditModal({ ...employee, password: "" })
                          }
                        >
                          Edit
                        </button>
                        <button
                          className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                          onClick={() => handleDelete(employee.user_id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
        <div className="relative z-50 w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">Edit Employee</h3>
          <form onSubmit={(e) => handleEditEmployee(e)} className="space-y-6">
            <div>
              <div className="mb-4 flex justify-center">
                <div className="w-28 h-28 rounded-full border-4 border-gray-100 bg-gray-50 flex items-center justify-center overflow-hidden">
                  {selectedEmployee?.avatar ? (
                    <img
                      src={`data:image/jpeg;base64,${selectedEmployee?.avatar}`}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-400">no avatar</span>
                  )}
                </div>
              </div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Update Avatar
              </label>
              <input
                type="file"
                accept="image/*"
                id="avatar"
                name="avatar"
                onChange={handleFileChange}
                className="w-full px-4 py-2 text-sm text-gray-700 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#260058] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                id="username"
                name="username"
                value={selectedEmployee?.username}
                onChange={handleChange}
                className="w-full px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#260058]"
                placeholder="Enter username"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={selectedEmployee?.password}
                onChange={handleChange}
                className="w-full px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#260058]"
                placeholder="Leave blank to keep current password"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Department
              </label>
              <p className="text-sm text-gray-500 mb-2">
                Current: <span className="font-medium text-gray-900">{departments.find((d) => d.dept_name === selectedEmployee?.dept_name)?.dept_name || "Not Assigned"}</span>
              </p>
              <select
                id="department"
                name="dept_id"
                value={selectedEmployee?.dept_id || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#260058] bg-white"
              >
                <option value="">Select Department</option>
                {departments.map((dept) => (
                  <option key={dept.dept_id} value={dept.dept_id}>
                    {dept.dept_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => setEditModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-[#260058] hover:bg-[#3e0091] rounded-lg transition-colors"
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
