import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost/emsystem/backend/index.php?action=';

const AddEmployee = () => {
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
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Add Employee</h1>
      {responseMsg && (
        <div
          className={`p-4 mb-4 rounded ${
            isSuccess ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
        >
          {responseMsg}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        <input
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="First Name"
          required
        />

        <input
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Last Name"
          required
        />

        <select
          name="dept_id"
          value={formData.dept_id}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">Select Department</option>
          {departments.map((dept) => (
            <option key={dept.dept_id} value={dept.dept_id}>
              {dept.dept_name}
            </option>
          ))}
        </select>

        <select
          name="role_id"
          value={formData.role_id}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">Select Role</option>
          {roles.map((role) => (
            <option key={role.role_id} value={role.role_id}>
              {role.role_name}
            </option>
          ))}
        </select>

        <input
          name="job_title"
          value={formData.job_title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Job Title"
          required
        />

        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          type="email"
          className="w-full border p-2 rounded"
          placeholder="Email"
          required
        />

        <input
          name="contact_number"
          value={formData.contact_number}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Contact Number"
          required
        />

        <input
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Address"
          required
        />

        <input
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Username"
          required
        />

        <input
          name="password"
          value={formData.password}
          onChange={handleChange}
          type="password"
          className="w-full border p-2 rounded"
          placeholder="Password"
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full border p-2 rounded"
        />

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700">
          Add Employee
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;