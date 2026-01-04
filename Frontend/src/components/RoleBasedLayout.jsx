import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../context/Authcontext";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import BottomNav from "./BottomNav";

const RoleBasedLayout = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Sidebar role={user?.role} />
      
      {/* Main Content */}
      <main className="pt-16 md:pl-64">
        <div className="pb-20 md:pb-6">
          <Outlet />
        </div>
      </main>
      
      <BottomNav />
    </div>
  );
};

export default RoleBasedLayout;
