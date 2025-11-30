import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMenu, IoClose, IoLogOutOutline } from "react-icons/io5";

const Navbar = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 shadow-sm z-50">
        <div className="flex justify-between items-center h-16 px-0">
          
          {/* Logo - Left Most */}
          <div className="pl-4 flex items-center">
            <img
              src="/LogoD.png"
              alt="AgriConnect Logo"
              className="h-12 w-auto object-contain"
            />
          </div>

          {/* Desktop Logout */}
          <div className="hidden md:flex items-center space-x-1 pr-4">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
            >
              <IoLogOutOutline className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition mr-4"
          >
            {mobileMenuOpen ? (
              <IoClose className="w-6 h-6 text-gray-900" />
            ) : (
              <IoMenu className="w-6 h-6 text-gray-900" />
            )}
          </button>
        </div>

        {/* ⭐ Mobile Dropdown Menu (Fix Added) */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-3 space-y-1">
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-2 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition"
              >
                <IoLogOutOutline className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
