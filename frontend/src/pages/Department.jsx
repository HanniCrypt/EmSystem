import { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost/emsystem/backend/index.php?action=';

const Department = () => {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const res = await axios.get(`${API_URL}departments`);
      setDepartments(res.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Departments</h1>
      <table className="w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Department ID</th>
            <th className="border p-2">Department Name</th>
          </tr>
        </thead>
        <tbody>
          {departments.length > 0 ? (
            departments.map((dept) => (
              <tr key={dept.dept_id}>
                <td className="border p-2">{dept.dept_id}</td>
                <td className="border p-2">{dept.dept_name}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="text-center p-4">No departments found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Department;
