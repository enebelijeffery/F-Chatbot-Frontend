import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Link,
  Grid,
  Paper,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // For navigation

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null); // Reset error state

    try {
      const response = await fetch('https://f-chatbot-backend.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem('authToken')}`, 
        },
        body: JSON.stringify({ email,
          password, }),
      });
      const data = await response.json();
      console.log(data)
      const token = data.token; // Assuming the token is in response.data.token
      localStorage.setItem("authToken", token); // Save token in localStorage
      // window.location.href = '/';
      console.log('local',localStorage.getItem('authToken'))
      // Redirect user to dashboard or another page
      navigate("/");
    } catch (err) {
      console.error("Login failed:", err);
      setError(err.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  return (
    <Grid
      container
      component="main"
      sx={{
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#141b2d",
      }}
    >
      <Grid item xs={11} sm={8} md={5} lg={4}>
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            borderRadius: 2,
            backgroundColor: "#2c3e50",
          }}
        >
          <Typography color="black" component="h1" variant="h5" align="center" gutterBottom>
            Sign In
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <form onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              type="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid color={'#1976d2'} container>
              <Grid item xs>
                <Link color="#1976d2" href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link color="#1976d2" href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Signin;
