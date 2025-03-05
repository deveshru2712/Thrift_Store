import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import Welcome from "./Pages/Welcome";

const App = () => {
  return (
    <div className="w-screen h-screen">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Welcome />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </div>
  );
};

export default App;
