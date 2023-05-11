import React from "react";
import { AppBar, Button, Toolbar, Typography, styled } from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

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
            <Link to="/shelters">
              <Button variant="contained">Shelters</Button>
            </Link>
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
          <Typography
            variant="h6"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Pet Adopter!
          </Typography>
          <PetsIcon sx={{ display: { xs: "block", sm: "none" } }} />
          <Link to="/shelters">
            <Button variant="contained">Shelters</Button>
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
