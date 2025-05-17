import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import { MdSettings } from "react-icons/md";
import { IoChevronBackOutline } from "react-icons/io5";

const API_URL = "http://localhost/emsystem/backend/index.php?action=";

const LINKS = [
  {
    path: "/employee/profile",
    name: "Profile",
    icon: <MdSettings size={20} />,
  },
];

const EmployeeLayout = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.post(
          `${API_URL}checkAuth`,
          {},
          { withCredentials: true }
        );

        if (response.data.type !== "success") {
          localStorage.removeItem("isLoggedin");
          navigate("/");
        } else {
            const response = await axios.post(
                `${API_URL}fetchUserDetails`,
                {},
                { withCredentials: true }
              );
        
              setUser(response.data.user);
        }

        switch (response.data.role) {
          case "admin":
            navigate("/admin/dashboard");
            break;
          case "hr":
            navigate("/hr/employees");
            break;
          case "employee":
            navigate("/employee/profile");
            break;
        }

      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    await axios.post(`${API_URL}logoutUser`, {}, { withCredentials: true });

    localStorage.removeItem("isLoggedin");
    navigate("/");
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="flex min-h-screen w-full font-sans bg-gray-50">
      {/* Sidebar */}
      <aside 
        className={`
          fixed left-0 top-0 h-screen
          bg-gray-900
          transition-[width,transform] duration-300 ease-in-out
          ${isSidebarCollapsed ? 'w-[68px]' : 'w-[240px]'}
          flex flex-col
          border-r border-gray-800
          z-20
        `}
      >
        <div className="flex flex-col h-full relative">
          {/* Sidebar Header */}
          <div className="p-4 flex items-center h-16 border-b border-gray-800">
            <h1 className={`
              text-xl font-bold text-white
              transition-all duration-300 ease-in-out
              overflow-hidden whitespace-nowrap
              ${isSidebarCollapsed ? 'w-0 opacity-0' : 'w-full opacity-100'}
            `}>
              Employee Portal
            </h1>
          </div>

          {/* Toggle Button */}
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className={`
              absolute -right-4 top-[72px]
              w-8 h-8
              bg-white
              rounded-full
              shadow-lg
              flex items-center justify-center
              text-gray-700
              hover:bg-gray-50
              active:bg-gray-100
              transition-all duration-300
              transform
              ${isSidebarCollapsed ? 'rotate-180' : 'rotate-0'}
              border border-gray-200
              hover:border-gray-300
              hover:shadow-md
              z-30
              group
            `}
            aria-label="Toggle Sidebar"
          >
            <IoChevronBackOutline 
              size={18}
              className={`
                transform transition-transform duration-300 ease
                group-hover:scale-110
                relative left-[1px]
              `}
            />
          </button>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4">
            <div className="flex flex-col gap-1">
              {LINKS.map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  title={isSidebarCollapsed ? link.name : ''}
                  className={`
                    flex items-center gap-3
                    px-3 py-2.5
                    rounded-lg
                    transition-all duration-200
                    hover:bg-gray-800
                    group
                    relative
                    ${location.pathname === link.path 
                      ? 'bg-gray-800 text-white' 
                      : 'text-gray-400 hover:text-white'}
                  `}
                >
                  <span className="text-lg min-w-[24px] flex items-center justify-center">
                    {link.icon}
                  </span>
                  <span className={`
                    whitespace-nowrap
                    transition-all duration-300
                    ${isSidebarCollapsed ? 'w-0 opacity-0' : 'w-full opacity-100'}
                  `}>
                    {link.name}
                  </span>
                  {isSidebarCollapsed && (
                    <div className="
                      absolute left-full ml-2
                      px-2 py-1
                      bg-gray-900 text-white
                      text-sm rounded
                      opacity-0 group-hover:opacity-100
                      pointer-events-none
                      transition-opacity duration-200
                      whitespace-nowrap
                      shadow-lg
                    ">
                      {link.name}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div 
        className={`
          flex-1 flex flex-col
          transition-[margin] duration-300 ease-in-out
          ${isSidebarCollapsed ? 'ml-[68px]' : 'ml-[240px]'}
        `}
      >
        <header className="sticky top-0 w-full bg-white shadow-sm z-10">
          <div className="w-full px-6 md:px-8 py-4">
            <div className="flex justify-end items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gradient-to-r from-[#260058] to-[#3e0091] rounded-full flex items-center justify-center text-white font-bold text-lg overflow-hidden border-2 border-[#3e0091]/20">
                  {user?.avatar ? (
                    <img
                      src={`data:image/jpeg;base64,${user?.avatar}`}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    "E"
                  )}
                </div>
                <span className="text-sm font-medium text-gray-600">
                  Welcome back, <span className="text-gray-900 font-semibold">{user?.username}</span>
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        <main className="flex-grow w-full p-6 bg-gray-50">
          <Outlet context={{ user, setUser }} />
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default EmployeeLayout;
