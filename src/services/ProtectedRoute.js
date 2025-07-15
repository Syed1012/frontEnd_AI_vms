import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
// import { toast } from "react-toastify";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    // If the user is not logged in, redirect to login
    return <Navigate to="/login" replace />;
  }

  try {
    const decodedToken = jwtDecode(token);
    const userRole = decodedToken?.role;

    // Check if the user's role matches one of the allowed roles
    if (!allowedRoles.includes(userRole)) {
      // If not allowed, redirect to an error page or home
      return <Navigate to="/" replace />;
    }

    return children; // Render the children if access is granted
  } catch (error) {
    console.error('Failed to decode token:', error);
    // In case of error, redirect to login
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
