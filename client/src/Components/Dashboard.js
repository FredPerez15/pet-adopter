import React from "react";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ user, setUser }) => {
  const navigate = useNavigate();

  function handleLogout() {
    fetch("/logout", {
      method: "DELETE",
    }).then(setUser(null), navigate("/"));
  }

  return (
    <>
      <Typography>Welcome, {user?.username}</Typography>
      <IconButton
        color="inherit"
        onClick={handleLogout}
        sx={{ marginLeft: "auto" }}
      ></IconButton>
    </>
  );
};

export default Dashboard;
