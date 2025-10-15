import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "../pages/Welcome";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import AdminDashboard from "../pages/Admin/Dashboard";
// import OwnerDashboard from "../pages/Owner/Dashboard";
// import ShopkeeperDashboard from "../pages/Shopkeeper/Dashboard";
// import FarmerDashboard from "../pages/Farmer/Dashboard";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>  
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        {/* <Route path="/owner/dashboard" element={<OwnerDashboard />} />
        <Route path="/shopkeeper/dashboard" element={<ShopkeeperDashboard />} />
        <Route path="/farmer/dashbo ard" element={<FarmerDashboard />} /> */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
