import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ children }) => {

  const token = localStorage.getItem('authToken'); // Check if token exists

  const isTokenValid = (token) => {
    try {
      const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
      const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
      return decodedToken.exp > currentTime; // Check if the token has expired
    } catch (error) {
      return false; // Invalid token format
    }
  };  
  return token && isTokenValid(token) ? <Outlet />  : <Navigate to="/signin" />;
};

export default PrivateRoute;

const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login'; // Redirect to login page
  };
  