import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { isLoggedIn } from "../api/api";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();

  if (!isLoggedIn()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
