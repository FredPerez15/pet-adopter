import React from "react";
import { useState, useEffect } from "react";
import Navbar from "./Components/Navbar";
import Signup from "./Components/Signup";
import Shelter from "./Components/Shelter";
import Login from "./Components/Login";
import Home from "./Components/Home";
import Dashboard from "./Components/Dashboard";
import { Routes, Route } from "react-router-dom";

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
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login handleLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={<Dashboard user={user} setUser={setUser} />}
        />
      <Route path='/shelters' element={<Shelter />} />
      </Routes>
    </div>
  );
};

export default App;
