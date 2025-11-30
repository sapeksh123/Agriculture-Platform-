import { useNavigate, useLocation } from "react-router-dom";
import { IoHome, IoPeople, IoBuild, IoCar, IoSettings } from "react-icons/io5";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: "Dashboard", icon: IoHome, path: "/admin/dashboard" },
    { label: "Users", icon: IoPeople, path: "/admin/users" },
    { label: "Equipment", icon: IoBuild, path: "/admin/equipment" },
    { label: "Vehicles", icon: IoCar, path: "/admin/vehicles" },
    { label: "Settings", icon: IoSettings, path: "/admin/settings" },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center justify-center flex-1 h-full transition"
            >
              <item.icon
                className={`w-6 h-6 ${
                  isActive ? "text-green-600" : "text-gray-400"
                }`}
              />
              <span
                className={`text-xs mt-1 ${
                  isActive ? "text-green-600 font-medium" : "text-gray-400"
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
