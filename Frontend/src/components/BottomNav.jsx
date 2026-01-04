import { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import menuItems from "../config/menuItems";
import { AuthContext } from "../context/Authcontext";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);

  // Get menu items based on user role and show only first 5 items for mobile
  const navItems = (menuItems[user?.role] || []).slice(0, 5);

  // If no items, don't render
  if (!navItems.length) {
    return null;
  }

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const IconComponent = item.icon;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center justify-center flex-1 h-full transition"
            >
              {IconComponent && (
                <IconComponent
                  sx={{
                    fontSize: 24,
                    color: isActive ? "#16a34a" : "#d1d5db",
                  }}
                />
              )}
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
