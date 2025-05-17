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

function AdminAllUsersList() {
  const { user: currentUser } = useOutletContext();

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editModal, setEditModal] = useState(false);

  const [selectedRole, setSelectedRole] = useState("");

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

  const fetchAllUsers = async () => {
    const response = await axios.post(`${API_URL}fetchAllUsers`);
    setUsers(response.data);
  };

  useEffect(() => {
    fetchAllUsers();
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
          fetchAllUsers();
        } else {
          alert(response.data.message);
          fetchAllUsers();
        }
      } catch (error) {
        console.error("Error deleting employee:", error);
        alert("Failed to delete employee");
      }
    }
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

    await axios.post(
      `${API_URL}updateEmployee`,
      {
        user_id: selectedUser.user_id,
        avatar: selectedUser.avatar,
        username: selectedUser.username,
        newPass: selectedUser.password,
        dept_id: selectedUser.dept_id
      },
      { withCredentials: true }
    );

    setEditModal(false);
    fetchAllUsers();
  };

  const roles = [...new Set(users.map((u) => u.role))];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">All Users</h1>
          <div className="flex gap-4">
            <CustomDropdown
              value={selectedDepartment}
              onChange={setSelectedDepartment}
              options={departments}
              label="Departments"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              }
            />
            <CustomDropdown
              value={selectedRole}
              onChange={setSelectedRole}
              options={roles}
              label="Roles"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              }
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Avatar</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Username</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Role</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Department</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Created At</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users
                  ?.filter(
                    (user) =>
                      (selectedDepartment
                        ? user.dept_name === selectedDepartment
                        : true) &&
                      (selectedRole ? user.role === selectedRole : true)
                  )
                  .map((user) => (
                    <tr key={user.user_id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          {user.avatar ? (
                            <img
                              src={`data:image/jpeg;base64,${user.avatar}`}
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
                      <td className="px-6 py-4 text-sm text-gray-600">{user.user_id}</td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-700">{user.username}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        <span className="px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 font-medium">
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        <span className="px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 font-medium">
                          {user?.dept_name}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{user.created_at}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          {user.user_id === currentUser.user_id ? (
                            <span className="px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 font-medium">You</span>
                          ) : (
                            <>
                              <button
                                className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                                onClick={() =>
                                  handleEditModal({ ...user, password: "" })
                                }
                              >
                                Edit
                              </button>
                              <button
                                className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                                onClick={() => handleDelete(user.user_id)}
                              >
                                Delete
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
        <div className="relative z-50 w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">Edit User</h3>
          <form onSubmit={handleEditEmployee} className="space-y-6">
            <div>
              <div className="mb-4 flex justify-center">
                <div className="w-28 h-28 rounded-full border-4 border-gray-100 bg-gray-50 flex items-center justify-center overflow-hidden">
                  {selectedUser?.avatar ? (
                    <img
                      src={`data:image/jpeg;base64,${selectedUser.avatar}`}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-400">No Avatar</span>
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
                value={selectedUser?.username}
                onChange={handleChange}
                className="w-full px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#260058]"
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
                value={selectedUser?.password}
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
                Current: <span className="font-medium text-gray-900">{departments.find((d) => d.dept_name === selectedUser?.dept_name)?.dept_name || "Not Assigned"}</span>
              </p>
              <select
                id="department"
                name="dept_id"
                value={selectedUser?.dept_id || ""}
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

export default AdminAllUsersList;
