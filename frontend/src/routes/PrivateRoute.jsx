import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';

const PrivateRoute = () => {
  let authenticated = true;
  const navigate = useNavigate();
  const isLoggedin = localStorage.getItem('isLoggedin');

  useEffect(() => {
    if (!isLoggedin) {
      setTimeout(() => {
        localStorage.removeItem('isLoggedin')
        navigate('/');
      }, 0);
    }
  }, [authenticated, navigate, isLoggedin]);

  return <div>{authenticated ? <Outlet /> : <Navigate to='/' />}</div>;
};

export default PrivateRoute;
