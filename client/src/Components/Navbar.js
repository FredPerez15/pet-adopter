//react imports
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import React from "react";

//MUI imports
import { AppBar, Toolbar, Typography, styled } from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blue } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: blue[50],
    },
    secondary: {
      main: "#2f739b",
    },
    third: {
      main: "#32312c",
    },
  },
});

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const StyledToolBar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-evenly",
  });

  function handleLogout() {
    fetch("/logout", {
      method: "DELETE",
    }).then(setUser(null), navigate("/"));
  }

  if (!user) {
    return (
      <>
        <ThemeProvider theme={theme}>
          <AppBar position="sticky" color="secondary">
            <StyledToolBar>
              <NavLink
                to="/"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Typography
                  variant="h6"
                  sx={{ display: { xs: "none", sm: "block" } }}
                >
                  Pet Adopter!
                </Typography>
              </NavLink>
              <PetsIcon sx={{ display: { xs: "block", sm: "none" } }} />
              <NavLink
                to="/login"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Typography variant="h6" style={{ cursor: "pointer" }}>
                  Login
                </Typography>
              </NavLink>
            </StyledToolBar>
          </AppBar>
        </ThemeProvider>
      </>
    );
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <AppBar position="sticky" color="secondary">
          <StyledToolBar>
            <NavLink
              to="/dashboard"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography
                variant="h6"
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                My Profile
              </Typography>
            </NavLink>
            <NavLink>
              <PetsIcon
                sx={{ display: { xs: "block", sm: "none" } }}
                style={{ textDecoration: "none", color: "white" }}
              />
            </NavLink>
            <Typography variant="h6">
              <NavLink
                to="/shelters"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Shelters
              </NavLink>
            </Typography>
            <Typography variant="h6">
              <NavLink
                to="/pets"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Pets
              </NavLink>
            </Typography>
            <Typography
              variant="h6"
              onClick={handleLogout}
              style={{ cursor: "pointer" }}
            >
              Logout
            </Typography>
          </StyledToolBar>
        </AppBar>
      </ThemeProvider>
    </>
  );
};

export default Navbar;
