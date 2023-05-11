import React from "react";
import Typography from "@mui/material/Typography";

const Dashboard = ({ user }) => {
  return (
    <>
      <Typography>Welcome, {user?.username}</Typography>
    </>
  );
};

export default Dashboard;
