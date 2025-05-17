import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost/emsystem/backend/index.php?action=';

// fetch all users change table
const EmployeeList = () => {
  const [EmpData, setEmpData] = useState([]);
  const [roles, setRoles] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [filters, setFilters] = useState({
    name: '',
    role_id: '',
    dept_id: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
    fetchRoles();
    fetchDepartments();
  }, [filters]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}fetch`, {
        params: filters,
      });
      setEmpData(response.data);
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

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = (id) => {
    navigate(`/edit-employee/${id}`);
  };

  const handleDelete = async (emp_id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        const response = await axios.get(`${API_URL}delete`, {
          params: { emp_id },
        });
        if (response.data.type === 'success') {
          alert(response.data.message);
          fetchData(); // Refresh the employee list
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        console.error('Error deleting employee:', error);
        alert('Failed to delete employee');
      }
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Employee List</h1>

      {/* Filters */}
      <div className="mb-4 flex space-x-4">
        <input
          type="text"
          name="name"
          value={filters.name}
          onChange={handleFilterChange}
          placeholder="Search by name"
          className="border p-2 rounded w-1/3"
        />
        <select
          name="role_id"
          value={filters.role_id}
          onChange={handleFilterChange}
          className="border p-2 rounded w-1/3"
        >
          <option value="">Filter by Role</option>
          {roles.map((role) => (
            <option key={role.role_id} value={role.role_id}>
              {role.role_name}
            </option>
          ))}
        </select>
        <select
          name="dept_id"
          value={filters.dept_id}
          onChange={handleFilterChange}
          className="border p-2 rounded w-1/3"
        >
          <option value="">Filter by Department</option>
          {departments.map((dept) => (
            <option key={dept.dept_id} value={dept.dept_id}>
              {dept.dept_name}
            </option>
          ))}
        </select>
      </div>

      {/* Employee Table */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Profile Picture</th>
            <th className="border p-2">First Name</th>
            <th className="border p-2">Last Name</th>
            <th className="border p-2">Username</th>
            <th className="border p-2">Department</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Job Title</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {EmpData.length > 0 ? (
            EmpData.map((emp) => (
              <tr key={emp.emp_id}>
                <td className="border p-2">{emp.emp_id}</td>
                <td className="border p-2">
                  {emp.profile_picture ? (
                    <img
                      src={`data:image/jpeg;base64,${emp.profile_picture}`}
                      alt="Profile"
                      className="w-16 h-16 rounded-full"
                    />
                  ) : (
                    'No Image'
                  )}
                </td>
                <td className="border p-2">{emp.first_name}</td>
                <td className="border p-2">{emp.last_name}</td>
                <td className="border p-2">{emp.username}</td>
                <td className="border p-2">{emp.dept_name || 'Unknown Department'}</td>
                <td className="border p-2">{emp.role_name || 'Unknown Role'}</td>
                <td className="border p-2">{emp.job_title}</td>
                <td className="border p-2">{emp.email}</td>
                <td className="border p-2">{emp.contact_number}</td>
                <td className="border p-2">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600 cursor-pointer"
                    onClick={() => handleEdit(emp.emp_id)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer"
                    onClick={() => handleDelete(emp.emp_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="11" className="text-center p-4">
                No employee data found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;