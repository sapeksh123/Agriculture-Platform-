// src/theme/AppThemeProvider.jsx
import React, { useState, useMemo, createContext, useContext } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

// Context to provide theme toggle function
const ColorModeContext = createContext({ toggleColorMode: () => {} });

// export const useColorMode = () => useContext(ColorModeContext);

export default function AppThemeProvider({ children }) {
  const [mode, setMode] = useState("light"); // default mode

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: "#2e7d32" },
          secondary: { main: "#81c784" },
          background: {
            default: mode === "light" ? "#f9fbe7" : "#121212",
            paper: mode === "light" ? "#fff" : "#1e1e1e",
          },
        },
        typography: {
          fontFamily: "Roboto, sans-serif",
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
