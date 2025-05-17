import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost/emsystem/backend/index.php?action=';

const Users = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [roleName, setRoleName] = useState('');
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

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

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post(`${API_URL}loginWithRole`, {
        username,
        password,
        role_name: roleName,
      });

      if (response.data.type === 'success') {
        setIsLoggedIn(true);
        setUserData(response.data.user); // Store user data
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  const handleLogout = async () => {
    setIsLoggedIn(false);
    setUserData(null); // Clear user data
  };

  return (
    <div className="p-4">
      {isLoggedIn ? (
        <div>
          <h2 className="text-2xl font-bold mb-4">Welcome, {userData?.username}!</h2>
          <p>User ID: {userData?.user_id}</p>
          <p>Role: {userData?.role_name}</p>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      ) : (
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block font-bold">Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="border p-2 rounded w-full"
            />
          </div>
          <div>
            <label className="block font-bold">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border p-2 rounded w-full"
            />
          </div>
          <div>
            <label className="block font-bold">Role:</label>
            <select
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              required
              className="border p-2 rounded w-full"
            >
              <option value="">Select Role</option>
              {roles.map((role) => (
                <option key={role.role_id} value={role.role_name}>
                  {role.role_name}
                </option>
              ))}
            </select>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Login
          </button>
        </form>
      )}
    </div>
  );
};

export default Users;