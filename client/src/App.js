import React from "react";
import { useState, useEffect } from "react";
import Navbar from "./Components/Navbar";
import Signup from "./Components/Signup";
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
      <Routes>
        <Route path="/" element={<Navbar handleLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={<Dashboard user={user} setUser={setUser} />}
        />
      </Routes>
    </div>
  );
};

export default App;
