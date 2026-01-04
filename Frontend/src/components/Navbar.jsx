import { useContext } from "react";
import { IoLogOutOutline } from "react-icons/io5";
import { AuthContext } from "../context/Authcontext";

const Navbar = () => {
  const { logout } = useContext(AuthContext);

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 shadow-sm z-50">
        <div className="flex justify-between items-center h-16 px-0">
          
          {/* Logo - Left */}
          <div className="pl-4 flex items-center">
            <img
              src="/LogoD.png"
              alt="AgriConnect Logo"
              className="h-12 w-auto object-contain"
            />
          </div>

          {/* Mobile Logout Icon (Hamburger Position) */}
          <button
            onClick={logout}
            className="md:hidden p-2 mr-4 rounded-lg hover:bg-gray-100 transition"
            title="Logout"
          >
            <IoLogOutOutline className="w-6 h-6 text-gray-900" />
          </button>

        </div>
      </nav>
    </>
  );
};

export default Navbar;
