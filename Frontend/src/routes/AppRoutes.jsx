import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import Welcome from "../pages/Welcome";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import AdminLayout from "../pages/Admin/AdminLayout";
import Dashboard from "../pages/Admin/Dashboard";
import Users from "../pages/Admin/Users";
import Equipment from "../pages/Admin/Equipment";
import Vehicles from "../pages/Admin/Vehicles";
import Settings from "../pages/Admin/Settings";
import Shops from "../pages/Admin/Shops";

const AppRoutes = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>  
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="equipment" element={<Equipment />} />
            <Route path="vehicles" element={<Vehicles />} />
            <Route path="shops" element={<Shops />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default AppRoutes;
