// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // 🟢 Load auth state on app start (classic pattern)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    
    // Fallback to sessionStorage if localStorage is empty
    const sessionUser = sessionStorage.getItem("user");
    const sessionToken = sessionStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    } else if (sessionUser && sessionToken) {
      setUser(JSON.parse(sessionUser));
      setToken(sessionToken);
    }
  }, []);

  // 🟢 Central auth setter (used after login / register)
  const setAuth = ({ user, token }) => {
    setUser(user);
    setToken(token);

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    
    // Also save to sessionStorage as backup
    sessionStorage.setItem("user", JSON.stringify(user));
    sessionStorage.setItem("token", token);

    redirectByRole(user.role);
  };

  // 🟢 Role-based redirect (single source of truth)
  const redirectByRole = (role) => {
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

  // 🟢 Login helper (optional use if you want API outside)
  const loginWithResponse = (data) => {
    // data = { token, user }
    if (!data?.token || !data?.user) return;
    setAuth(data);
  };

  // 🟠 Logout (clean & complete)
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    setUser(null);
    setToken(null);

    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        setAuth,
        loginWithResponse,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
