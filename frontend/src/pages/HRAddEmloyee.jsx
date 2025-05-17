import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost/emsystem/backend/index.php?action=";

const HRAddEmployee = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [status, setStatus] = useState(null);

  const [department, setDepartment] = useState("");
  const [departments, setDepartments] = useState([]);

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

  const handleAddEmployee = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${API_URL}addNewUser`,
        {
          username,
          password,
          role: "employee", // hardcoded role
          avatar: avatar === null ? "" : avatar,
          dept_id: department,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.type === "success") {
        setUsername("");
        setAvatar("");
        setPassword("");
        setDepartment("");
        setStatus(true);
      }
    } catch (error) {
      console.error(error);
      setStatus(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result.split(",")[1]);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        {status !== null && (
          <div
            className={`p-5 mb-8 rounded-xl shadow-lg border-2 transform hover:scale-[1.01] transition-all duration-300 ${
              status ? "bg-green-50 border-green-300 text-green-800" : "bg-red-50 border-red-300 text-red-800"
            }`}
          >
            <div className="flex items-center gap-3">
              {status ? (
                <svg className="w-6 h-6 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-6 h-6 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              )}
              <span className="text-base font-medium">
                {status ? "Employee added successfully!" : "Failed to add employee"}
              </span>
            </div>
          </div>
        )}

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
            Add New Employee
          </h2>
          <p className="mt-2 text-gray-600">Create a new employee account with department</p>
        </div>

        <form onSubmit={handleAddEmployee} className="space-y-6">
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700">
              Avatar
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-4 py-3 text-base text-gray-700 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 hover:border-gray-900 file:mr-5 file:py-2.5 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 file:cursor-pointer"
            />
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700">
              Username
            </label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 text-base border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 hover:border-gray-900"
              placeholder="Enter username"
              required
            />
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 text-base border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 hover:border-gray-900"
              placeholder="Enter password"
              required
            />
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700">
              Department
            </label>
            <select
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

          <div className="pt-6">
            <button
              type="submit"
              className="w-full px-8 py-3 text-base font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
            >
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HRAddEmployee;
