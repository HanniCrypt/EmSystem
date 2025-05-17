import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost/emsystem/backend/index.php?action=';

const EditEmployee = () => {
  const { id } = useParams(); // Get employee ID from URL
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
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

  const [roles, setRoles] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    fetchEmployee();
    fetchRoles();
    fetchDepartments();
  }, []);

  const fetchEmployee = async () => {
    try {
      const response = await axios.get(`${API_URL}getEmployee`, {
        params: { id },
      });
      setEmployee(response.data);
      if (response.data.profile_picture) {
        setPreviewImage(`data:image/jpeg;base64,${response.data.profile_picture}`);
      }
    } catch (error) {
      console.error('Error fetching employee data:', error);
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await axios.get(`${API_URL}roles`);
      setRoles(response.data);
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };

  const fetchDepartments = async () => {
    try {
      const response = await axios.get(`${API_URL}departments`);
      setDepartments(response.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setEmployee((prev) => ({
          ...prev,
          profile_picture: reader.result.split(',')[1], // Base64 string
        }));
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}edit`, employee);
      alert('Employee updated successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error updating employee:', error);
      alert('Failed to update employee.');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Employee</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="first_name"
            value={employee.first_name}
            onChange={handleInputChange}
            className="border p-2 rounded w-full"
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="last_name"
            value={employee.last_name}
            onChange={handleInputChange}
            className="border p-2 rounded w-full"
          />
        </div>
        <div>
          <label>Department:</label>
          <select
            name="dept_id"
            value={employee.dept_id}
            onChange={handleInputChange}
            className="border p-2 rounded w-full"
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept.dept_id} value={dept.dept_id}>
                {dept.dept_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Role:</label>
          <select
            name="role_id"
            value={employee.role_id}
            onChange={handleInputChange}
            className="border p-2 rounded w-full"
          >
            <option value="">Select Role</option>
            {roles.map((role) => (
              <option key={role.role_id} value={role.role_id}>
                {role.role_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Job Title:</label>
          <input
            type="text"
            name="job_title"
            value={employee.job_title}
            onChange={handleInputChange}
            className="border p-2 rounded w-full"
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={employee.email}
            onChange={handleInputChange}
            className="border p-2 rounded w-full"
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="text"
            name="contact_number"
            value={employee.contact_number}
            onChange={handleInputChange}
            className="border p-2 rounded w-full"
          />
        </div>
        <div>
          <label>Address:</label>
          <textarea
            name="address"
            value={employee.address}
            onChange={handleInputChange}
            className="border p-2 rounded w-full"
          />
        </div>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={employee.username}
            onChange={handleInputChange}
            className="border p-2 rounded w-full"
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={employee.password}
            onChange={handleInputChange}
            className="border p-2 rounded w-full"
          />
        </div>
        <div>
          <label>Profile Picture:</label>
          <input type="file" onChange={handleFileChange} className="border p-2 rounded w-full" />
          {previewImage && <img src={previewImage} alt="Preview" className="mt-2 w-32 h-32 rounded-full" />}
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer">
          Update Employee
        </button>
      </form>
    </div>
  );
};

export default EditEmployee;