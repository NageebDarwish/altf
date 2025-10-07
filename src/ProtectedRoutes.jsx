import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = ({ isLogged, children }) => {
  if (!isLogged) {
    return <Navigate to='/sign-in' />;
  }
  
  // If children are provided, render them directly
  if (children) {
    return children;
  }
  
  // Otherwise, render the Outlet for nested routes
  return <Outlet />;
}

export default ProtectedRoutes;