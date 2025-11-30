import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import BottomNav from "../../components/BottomNav";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Sidebar />
      
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

export default AdminLayout;
