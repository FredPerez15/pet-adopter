//react imports
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import React from "react";

//MUI imports
import { AppBar, Toolbar, Typography, styled } from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";

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
        <AppBar position="sticky">
          <StyledToolBar>
            <Typography
              variant="h6"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              Pet Adopter!
            </Typography>
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
      </>
    );
  }

  return (
    <>
      <AppBar position="sticky">
        <StyledToolBar>
          <NavLink
            to="/dashboard"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Typography
              variant="h6"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              Pet Adopter!
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
    </>
  );
};

export default Navbar;
