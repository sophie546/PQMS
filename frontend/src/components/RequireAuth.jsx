import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const RequireAuth = ({ children }) => {
  const location = useLocation();
  
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  if (token || user) {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace />;
};

export default RequireAuth;