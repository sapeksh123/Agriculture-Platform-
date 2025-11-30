// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // 🟢 Load user from localStorage when app starts
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // 🟢 Login logic (role-based redirect)
  const login = (email, password) => {
    let role = "user";

    if (email.includes("admin")) role = "admin";
    else if (email.includes("farmer")) role = "farmer";
    else if (email.includes("shop")) role = "shopkeeper";
    else if (email.includes("owner")) role = "owner";

    const loggedUser = { email, role };
    setUser(loggedUser);
    localStorage.setItem("user", JSON.stringify(loggedUser));

    // Redirect according to role
    switch (role) {
      case "admin":
        navigate("/admin/dashboard");
        break;
      case "farmer":
        navigate("/farmer/dashboard");
        break;
      case "shopkeeper":
        navigate("/shopkeeper/dashboard");
        break;
      case "owner":
        navigate("/owner/dashboard");
        break;
      default:
        navigate("/login");
        break;
    }
  };

  // 🟠 Logout logic
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
