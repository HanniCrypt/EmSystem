import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router";

const API_URL = "http://localhost/emsystem/backend/index.php?action=";

function PublicRoute() {
  const [loading, setLoading] = useState(true)
  const isLoggedin = localStorage.getItem("isLoggedin");

  const navigate = useNavigate()
  
  useEffect(() => {
    if(!isLoggedin){
      setLoading(false)
      return
    }
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
        }

        switch (response.data.role) {
          case "admin":
            navigate("/admin/dashboard");
            break;
          case "hr":
            navigate("/hr/employees");
            break;
            case "employee":
              navigate("/employee/home");
              break;
              
        }

        console.log(response);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);


  if(loading){
    return <h1>Loading...</h1>
  }

  return <Outlet />
}

export default PublicRoute;
