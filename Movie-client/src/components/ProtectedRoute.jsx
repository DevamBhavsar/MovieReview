import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import TokenService from "../api-client/token/tokenService";

const ProtectedRoute = ({ children }) => {
  const tokenService = new TokenService();
  return tokenService.isTokenValid() ? children : <Navigate to="/login" />;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
