import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicOnlyRoutes = ({ isLogged, children }) => {
  // If user is logged in, redirect to dashboard
  if (isLogged) {
    return <Navigate to='/dashboard/videos' replace />;
  }

  // If not logged in, render the auth pages
  return children;
};

export default PublicOnlyRoutes;

