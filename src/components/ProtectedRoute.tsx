import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../services/auth';

interface ProtectedRouteProps {
  redirectPath?: string;
}

/**
 * A wrapper component that protects routes requiring authentication
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  redirectPath = '/login' 
}) => {
  const location = useLocation();
  const isAuth = isAuthenticated();
  
  if (!isAuth) {
    // Redirect to login page, but save the current location they were trying to access
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }
  
  // Render child routes
  return <Outlet />;
};

export default ProtectedRoute;