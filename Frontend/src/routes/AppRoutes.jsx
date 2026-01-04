import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import Welcome from "../pages/Welcome";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import RoleBasedLayout from "../components/RoleBasedLayout";

//admin
import Dashboard from "../pages/Admin/Dashboard";
import Users from "../pages/Admin/Users";
import Equipment from "../pages/Admin/Equipment";
import Vehicles from "../pages/Admin/Vehicles";
import Settings from "../pages/Admin/Settings";
import Shops from "../pages/Admin/Shops";

//farmer
import FarmerDashboard from "../pages/Farmer/FarmerDashboard";

//shopkeeper
import ShopkeeperDashboard from "../pages/Shopkeeper/ShopkeeperDashboard";

//owner
import OwnerDashboard from "../pages/Owner/OwnerDashboard";

const AppRoutes = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>  
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<RoleBasedLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="equipment" element={<Equipment />} />
            <Route path="vehicles" element={<Vehicles />} />  
            <Route path="shops" element={<Shops />} />
            <Route path="settings" element={<Settings />} />
          </Route>
 
         {/* Farmer Routes */}
          <Route path="/farmer" element={<RoleBasedLayout />}>
            <Route path="dashboard" element={<FarmerDashboard />} />
          </Route>

          {/* Shopkeeper Routes */}
          <Route path="/shopkeeper" element={<RoleBasedLayout />}>
            <Route path="dashboard" element={<ShopkeeperDashboard />} />
          </Route>

          {/* Owner Routes */}
          <Route path="/owner" element={<RoleBasedLayout />}>
            <Route path="dashboard" element={<OwnerDashboard />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default AppRoutes;
