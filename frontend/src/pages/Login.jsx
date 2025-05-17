import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost/emsystem/backend/index.php?action=";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        `${API_URL}loginUser`,
        {
          username,
          password,
        },
        { withCredentials: true }
      );

      if (response.data.type === "success") {
        const user = response.data.user;

        localStorage.setItem("isLoggedin", true);

        switch (user?.role) {
          case "admin":
            navigate("/admin/dashboard");
            break;
          case "hr":
            navigate("/hr/employees");
            break;
          case "employee":
            navigate("/employee/home");
            break;
          default:
            navigate("/");
        }
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-gray-100 transform transition-all duration-300 hover:shadow-xl">
        <h2 className="text-center text-3xl font-bold text-gray-900 mb-8">Welcome Back</h2>

        {error && (
          <div className="mb-6 px-4 py-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl text-center transform transition-all duration-300 hover:scale-[1.02]">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-200 rounded-xl px-4 py-2.5 text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 hover:border-gray-900"
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-200 rounded-xl px-4 py-2.5 text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 hover:border-gray-900"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
          >
            Sign in
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-8">
          © {new Date().getFullYear()} EMSYSTEM
        </p>
      </div>
    </div>
  );
};

export default Login;
