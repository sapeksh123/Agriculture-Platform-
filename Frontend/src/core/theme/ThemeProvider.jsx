import React, { useState, useMemo, createContext, useContext } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

// Context for theme mode toggle
const ColorModeContext = createContext({ toggleColorMode: () => {} });

export const useColorMode = () => useContext(ColorModeContext);

export default function AppThemeProvider({ children }) {
  const [mode, setMode] = useState("light"); // Default: light mode

  // Function to toggle between light/dark
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  // Theme definitions for both modes
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
                //  Light Mode Colors
                primary: { main: "#2e7d32" }, // Deep green
                secondary: { main: "#81c784" }, // Soft light green
                background: {
                  default: "#f9fbe7", // very light greenish background
                  paper: "#ffffff",
                },
                text: {
                  primary: "#1b5e20",
                  secondary: "#4e342e",
                },
              }
            : {
                //  Dark Mode Colors
                primary: { main: "#66bb6a" }, // soft green
                secondary: { main: "#388e3c" }, // deeper natural green
                background: {
                  default: "#0d1c14ff", // dark forest green tone
                  paper: "#1b3320", // slightly lighter card surface
                },
                text: {
                  primary: "#e8f5e9", // pale mint
                  secondary: "#a5d6a7",
                },
              }),
        },
        typography: {
          fontFamily: "Roboto, sans-serif",
          h3: {
            fontWeight: 600,
          },
          button: {
            textTransform: "none",
          },
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 8,
                fontWeight: 500,
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                transition: "background-color 0.3s ease, color 0.3s ease",
              },
            },
          },
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
