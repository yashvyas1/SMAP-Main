import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ isLoggedIn, userType, requiredType }) => {
  if (!isLoggedIn) {
    return <Navigate to="/signin" />;
  }
  if (requiredType && userType !== requiredType) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
