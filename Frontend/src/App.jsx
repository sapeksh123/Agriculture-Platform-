import React from "react";
import AppRoutes from "./routes/AppRoutes";
import AppThemeProvider from "./core/theme/ThemeProvider";
import { AuthProvider } from "./core/context/AuthContext";

function App() {
  return (
    <AppThemeProvider>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </AppThemeProvider>
  );
}

export default App; 
