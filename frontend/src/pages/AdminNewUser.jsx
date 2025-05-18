import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost/emsystem/backend/index.php?action=";

const roles = ["employee", "hr", "admin"];

const ConfirmationDialog = ({ isOpen, onClose, onConfirm, role }) => {
  if (!isOpen) return null;

  let message;
  let icon;
  
  if (role === "hr") {
    message = "Are you sure you want to add a new HR user? They will have access to employee management.";
    icon = (
      <svg className="w-12 h-12 text-blue-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    );
  } else if (role === "admin") {
    message = "Warning: You are about to add a new admin user. They will have full system access and all administrative privileges. Are you sure you want to proceed?";
    icon = (
      <svg className="w-12 h-12 text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    );
  } else {
    message = "Are you sure you want to add a new employee?";
    icon = (
      <svg className="w-12 h-12 text-green-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    );
  }

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
                {icon}
              </div>
              <h3 className="text-xl leading-6 font-bold text-gray-900 mb-2">
                Confirm New User
              </h3>
              <div className="mt-2 px-4">
                <p className="text-sm text-gray-600">
                  {message}
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
                  className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
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

const AdminNewUser = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [status, setStatus] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [department, setDepartment] = useState("");
  const [departments, setDepartments] = useState([]);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.post(`${API_URL}departments`);

        setDepartments(response.data);
      } catch (error) {
        console.error("Failed to fetch departments", error);
      }
    };

    fetchDepartments();
  }, []);

  const handleAddNewUser = async (e) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  const handleConfirm = async () => {
    try {
      const response = await axios.post(
        `${API_URL}addNewUser`,
        {
          username,
          password,
          role,
          avatar: avatar === null ? "" : avatar,
          dept_id: department
        },
        {
          withCredentials: true,
        }
      );

      // Extract JSON from the response that might contain HTML notices
      let jsonData;
      if (typeof response.data === 'string') {
        const jsonStart = response.data.indexOf('{');
        const jsonEnd = response.data.lastIndexOf('}') + 1;
        const jsonStr = response.data.substring(jsonStart, jsonEnd);
        jsonData = JSON.parse(jsonStr);
      } else {
        jsonData = response.data;
      }

      if (jsonData.type === "success") {
        setUsername("");
        setAvatar("");
        setRole("");
        setPassword("");
        setDepartment("");
        setToast({
          show: true,
          message: `Successfully added new ${role} "${username}"`,
          type: "success"
        });
        setStatus(true);
      } else {
        setToast({
          show: true,
          message: jsonData.message || "Failed to add new user",
          type: "error"
        });
        setStatus(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setToast({
        show: true,
        message: "An error occurred while adding the new user",
        type: "error"
      });
      setStatus(false);
    }
    setShowConfirmation(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
        setAvatar(reader.result.split(",")[1]);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}
      <ConfirmationDialog
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={handleConfirm}
        role={role}
      />
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
            Add New User
          </h2>
          <p className="mt-2 text-gray-600">Create a new user account with role and department</p>
        </div>

        <form onSubmit={handleAddNewUser} className="space-y-6">
          <div className="space-y-3">
            <label
              htmlFor="avatar"
              className="block text-sm font-semibold text-gray-700"
            >
              Avatar
            </label>
            <div className="flex items-center space-x-6">
              <div className="shrink-0">
                <div className="h-24 w-24 rounded-full overflow-hidden bg-gray-100 border-2 border-gray-200">
                  {avatarPreview ? (
                    <img
                      src={avatarPreview}
                      alt="Avatar preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center">
                      <svg className="h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex-grow">
                <input
                  type="file"
                  accept="image/*"
                  id="avatar"
                  name="avatar"
                  onChange={handleFileChange}
                  className="w-full px-4 py-3 text-base text-gray-700 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 hover:border-gray-900 file:mr-5 file:py-2.5 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 file:cursor-pointer"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Recommended: Jpeg, Jpg, Max 2MB
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-3">
              <label
                htmlFor="username"
                className="block text-sm font-semibold text-gray-700"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 text-base border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 hover:border-gray-900"
                placeholder="Enter username"
                required
              />
            </div>

            <div className="space-y-3">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 text-base border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 hover:border-gray-900"
                placeholder="Enter password"
                required
              />
            </div>

            <div className="space-y-3">
              <label
                htmlFor="role"
                className="block text-sm font-semibold text-gray-700"
              >
                Role
              </label>
              <select
                id="role"
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-3 text-base border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 hover:border-gray-900 bg-white cursor-pointer"
                required
              >
                <option value="">Select Role</option>
                {roles.map((role, i) => (
                  <option key={i} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-3">
              <label
                htmlFor="department"
                className="block text-sm font-semibold text-gray-700"
              >
                Department
              </label>
              <select
                id="department"
                name="department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-4 py-3 text-base border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 hover:border-gray-900 bg-white cursor-pointer"
                required
              >
                <option value="">Select Department</option>
                {departments.map((dept, i) => (
                  <option key={i} value={dept.dept_id}>
                    {dept.dept_name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              className="w-full px-8 py-3 text-base font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
            >
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminNewUser;
