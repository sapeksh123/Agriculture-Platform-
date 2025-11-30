import { useNavigate, useLocation } from "react-router-dom";
import { IoHome, IoPeople, IoBuild, IoCar, IoStorefront, IoSettings } from "react-icons/io5";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: "Dashboard", icon: IoHome, path: "/admin/dashboard" },
    { label: "Users", icon: IoPeople, path: "/admin/users" },
    { label: "Equipment", icon: IoBuild, path: "/admin/equipment" },
    { label: "Vehicles", icon: IoCar, path: "/admin/vehicles" },
    { label: "Shops", icon: IoStorefront, path: "/admin/shops" },
    { label: "Settings", icon: IoSettings, path: "/admin/settings" },
  ];

  return (
    <aside className="hidden md:flex fixed left-0 top-16 bottom-0 w-64 bg-white border-r border-gray-200 flex-col">
      <div className="flex-1 overflow-y-auto py-6 px-3">
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                  isActive
                    ? "bg-green-50 text-green-600 font-semibold"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
