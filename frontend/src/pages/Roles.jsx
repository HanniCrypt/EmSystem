import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost/emsystem/backend/index.php?action=';

const Roles = () => {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await axios.get(`${API_URL}roles`);
      setRoles(response.data);
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Roles</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Role ID</th>
            <th className="border p-2">Role Name</th>
          </tr>
        </thead>
        <tbody>
          {roles.length > 0 ? (
            roles.map((role) => (
              <tr key={role.role_id}>
                <td className="border p-2">{role.role_id}</td>
                <td className="border p-2">{role.role_name}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="text-center p-4">
                No roles found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Roles;