// react imports
import React from "react";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

//component imports
import Navbar from "./Components/Navbar";
import Signup from "./Components/Signup";
import Shelter from "./Components/Shelter";
import Pets from "./Components/Pets";
import ShelterDetails from "./Components/ShelterDetails";
import Login from "./Components/Login";
import Home from "./Components/Home";
import Dashboard from "./Components/Dashboard";

//MUI imports
import Container from "@mui/material/Container";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetch("/check_session");
      if (resp.ok) {
        const user = await resp.json();
        setUser(user);
      }
    };
    fetchData();
  }, []);

  const handleLogin = (user) => {
    setUser(user);
  };

  return (
    <Container>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login handleLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={<Dashboard user={user} setUser={setUser} />}
        />
        <Route path="/shelters" element={<Shelter />} />
        <Route path="/shelters/:id" element={<ShelterDetails user={user} />} />
        <Route path="/pets" element={<Pets />} />
      </Routes>
    </Container>
  );
};

export default App;
