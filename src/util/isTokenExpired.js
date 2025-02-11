import {jwtDecode} from "jwt-decode";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Assuming you're using React Router for navigation


const isTokenExpired = (token) => {
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Current time in seconds
    return decodedToken.exp < currentTime; // Check if the token is expired
  } catch (error) {
    return true; // If decoding fails, assume the token is invalid
  }
};


export const SessionCheck = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = () => {
      const authToken = localStorage.getItem("authToken");
      if (authToken && isTokenExpired(authToken)) {
        // If the token is expired, log the user out
        localStorage.removeItem("authToken");
        navigate("/signin"); // Redirect to the login page
      }
    };

    // Check session every 5 minutes (300000 ms)
    const interval = setInterval(checkSession, 300000);
    
    // Also check on initial mount
    checkSession();

    return () => clearInterval(interval); // Clean up the interval on unmount
  }, [navigate]);

  return null; // This component does not render anything
};
