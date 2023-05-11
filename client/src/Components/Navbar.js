//react imports
import { useNavigate } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";
import React from "react";

//MUI imports
import { AppBar, Button, Toolbar, Typography, styled } from "@mui/material";
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
            <Link to="/login">
              <Button variant="contained">Login</Button>
            </Link>
          </StyledToolBar>
        </AppBar>
      </>
    );
  }

  return (
    <>
      <AppBar position="sticky">
        <StyledToolBar>
          <NavLink to="/dashboard" style={{ textDecoration: 'none', color: "inherit" }}>
            <Typography
              variant="h6"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              Pet Adopter!
            </Typography>
          </NavLink>
          <NavLink>
          <PetsIcon sx={{ display: { xs: "block", sm: "none" } }} style={{ textDecoration: 'none', color: "white" }} />
          </NavLink>
          <Link to="/shelters">
            <Button variant="contained">Shelters</Button>
          </Link>
          <Link to="/pets">
              <Button variant="contained">Pets</Button>
          </Link>
          <Button variant="contained" onClick={handleLogout}>
            Logout
          </Button>
        </StyledToolBar>
      </AppBar>
    </>
  );
};

export default Navbar;
