import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost/emsystem/backend/index.php?action=';

const AdminAddUser = () => {
    
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    dept_id: '',
    role_id: '',
    job_title: '',
    email: '',
    contact_number: '',
    address: '',
    username: '',
    password: '',
    profile_picture: '',
  });

  const [departments, setDepartments] = useState([]);
  const [roles, setRoles] = useState([]);
  const [responseMsg, setResponseMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false); // State to track success or error

  useEffect(() => {
    fetchDepartments();
    fetchRoles();
  }, []);

  const fetchDepartments = async () => {
    try {
      const res = await axios.get(`${API_URL}departments`);
      setDepartments(res.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const fetchRoles = async () => {
    try {
      const res = await axios.get(`${API_URL}roles`);
      setRoles(res.data);
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          profile_picture: reader.result.split(',')[1], // Base64 encoded string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API_URL}add`, formData);
      setResponseMsg(res.data.message);
      setIsSuccess(true); // Set success state
      setFormData({
        first_name: '',
        last_name: '',
        dept_id: '',
        role_id: '',
        job_title: '',
        email: '',
        contact_number: '',
        address: '',
        username: '',
        password: '',
        profile_picture: '',
      }); // Reset form
    } catch (error) {
      console.error('Error adding employee:', error);
      setResponseMsg('Failed to add employee.');
      setIsSuccess(false); // Set error state
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#260058] to-[#3e0091] text-white px-8 py-10 rounded-2xl shadow-xl mb-10 transform hover:scale-[1.02] transition-transform duration-300">
        <h1 className="text-4xl font-bold tracking-tight">Add Employee</h1>
        <p className="mt-3 text-lg text-purple-200 font-light">Create a new employee account</p>
      </div>

      <div className="px-4 sm:px-6">
        {responseMsg && (
          <div
            className={`p-5 mb-8 rounded-2xl shadow-lg border-2 transform hover:scale-[1.01] transition-all duration-300 ${
              isSuccess 
                ? 'bg-green-50 border-green-300 text-green-800' 
                : 'bg-red-50 border-red-300 text-red-800'
            }`}
          >
            <div className="flex items-center gap-4">
              {isSuccess ? (
                <svg className="w-6 h-6 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-6 h-6 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              )}
              <span className="text-base font-medium">{responseMsg}</span>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700">First Name</label>
                <input
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-base border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#260058] focus:border-transparent transition-all duration-200 hover:border-[#260058]"
                  placeholder="Enter first name"
                  required
                />
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700">Last Name</label>
                <input
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-base border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#260058] focus:border-transparent transition-all duration-200 hover:border-[#260058]"
                  placeholder="Enter last name"
                  required
                />
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700">Department</label>
                <select
                  name="dept_id"
                  value={formData.dept_id}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-base border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#260058] focus:border-transparent transition-all duration-200 hover:border-[#260058] bg-white cursor-pointer"
                  required
                >
                  <option value="">Select Department</option>
                  {departments.map((dept) => (
                    <option key={dept.dept_id} value={dept.dept_id}>
                      {dept.dept_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700">Role</label>
                <select
                  name="role_id"
                  value={formData.role_id}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-base border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#260058] focus:border-transparent transition-all duration-200 hover:border-[#260058] bg-white cursor-pointer"
                  required
                >
                  <option value="">Select Role</option>
                  {roles.map((role) => (
                    <option key={role.role_id} value={role.role_id}>
                      {role.role_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700">Job Title</label>
                <input
                  name="job_title"
                  value={formData.job_title}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-base border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#260058] focus:border-transparent transition-all duration-200 hover:border-[#260058]"
                  placeholder="Enter job title"
                  required
                />
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700">Email</label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  className="w-full px-4 py-3 text-base border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#260058] focus:border-transparent transition-all duration-200 hover:border-[#260058]"
                  placeholder="Enter email address"
                  required
                />
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700">Contact Number</label>
                <input
                  name="contact_number"
                  value={formData.contact_number}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-base border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#260058] focus:border-transparent transition-all duration-200 hover:border-[#260058]"
                  placeholder="Enter contact number"
                  required
                />
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700">Address</label>
                <input
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-base border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#260058] focus:border-transparent transition-all duration-200 hover:border-[#260058]"
                  placeholder="Enter address"
                  required
                />
              </div>
            </div>

            <div className="border-t-2 border-gray-100 my-10"></div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700">Username</label>
                <input
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-base border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#260058] focus:border-transparent transition-all duration-200 hover:border-[#260058]"
                  placeholder="Choose username"
                  required
                />
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700">Password</label>
                <input
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  type="password"
                  className="w-full px-4 py-3 text-base border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#260058] focus:border-transparent transition-all duration-200 hover:border-[#260058]"
                  placeholder="Enter password"
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700">Profile Picture</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full px-4 py-3 text-base text-gray-700 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#260058] focus:border-transparent transition-all duration-200 hover:border-[#260058] file:mr-5 file:py-2.5 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 file:cursor-pointer"
              />
            </div>

            <div className="flex justify-end pt-8">
              <button 
                type="submit" 
                className="px-8 py-3 text-base font-medium text-white bg-[#260058] hover:bg-[#3e0091] rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
              >
                Add Employee
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminAddUser;