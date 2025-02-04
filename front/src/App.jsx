import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login/Login";
import Status from "./components/Status/Status";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/status" element={<Status />} />
      <Route path="/" element={<Navigate replace to="/login" />} />
    </Routes>
  );
};

export default App;