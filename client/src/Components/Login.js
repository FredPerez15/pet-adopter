import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    const fetchData = async () => {
      const resp = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (resp.ok) {
        const user = await resp.json();
        handleLogin(user);
        navigate("/dashboard");
      }
    };
    fetchData();
  };
  return (
    <>
      <Container maxWidth="xs">
        <Box component="form" onSubmit={onSubmit} sx={{ mt: 1 }}>
  
          <TextField
            margin="normal"
            required
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid>
            <Box item>
              <Link to="/signup" variant="body2">
                Don't have an account? Sign Up
              </Link>
            </Box>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Login;
