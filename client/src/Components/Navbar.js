import React from "react";
import Login from "./Login";

const Navbar = ({ handleLogin }) => {
  return (
    <>
      <Login handleLogin={handleLogin} />
    </>
  );
};

export default Navbar;
