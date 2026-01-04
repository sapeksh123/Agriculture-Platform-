import { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IoLogOutOutline } from "react-icons/io5";
import menuItems from "../config/menuItems";
import { AuthContext } from "../context/Authcontext";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useContext(AuthContext);

  // Get menu items based on user role
  const navItems = user?.role ? (menuItems[user.role] || []) : [];

  // If no user or items, show empty sidebar
  if (!user || !navItems.length) {
    return (
      <aside className="hidden md:flex fixed left-0 top-16 bottom-0 w-64 bg-white border-r border-gray-200 flex-col">
        <div className="flex-1 overflow-y-auto py-6 px-3 text-center text-gray-400 flex items-center justify-center">
          {/* Loading state - user might still be loading */}
        </div>
      </aside>
    );
  }

  return (
    <aside className="hidden md:flex fixed left-0 top-16 bottom-0 w-64 bg-white border-r border-gray-200 flex-col">
      <div className="flex-1 overflow-y-auto py-6 px-3">
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const IconComponent = item.icon;
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
                {IconComponent && (
                  <IconComponent
                    sx={{
                      fontSize: 20,
                      color: isActive ? "#16a34a" : "inherit",
                    }}
                  />
                )}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
      
      {/* Logout Button at Bottom */}
      <div className="border-t border-gray-200 p-3">
        <button
          onClick={logout}
          className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition"
        >
          <IoLogOutOutline className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
