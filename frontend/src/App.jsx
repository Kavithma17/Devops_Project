import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Diary from "./pages/Diary";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      
  
        <Routes>
        
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/diary" element={<Diary />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
  
    </Router>
  );
}

export default App;

