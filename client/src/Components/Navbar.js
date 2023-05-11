import React from "react";
import { AppBar, Button, Toolbar, Typography, styled } from "@mui/material";
import PetsIcon from '@mui/icons-material/Pets';
import { Link } from 'react-router-dom';


const Navbar = ({ user }) => {

  const StyledToolBar = styled(Toolbar) ({
    display:"flex",
    justifyContent: "space-evenly",
  })

  return (
    <>
      <AppBar position="sticky">
        <StyledToolBar>
          <Typography variant="h6" sx={{display:{xs:"none", sm:"block"}}}>Pet Adopter!</Typography>
          <PetsIcon sx={{display:{xs:"block", sm:"none"}}}/>
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
};

export default Navbar;
