// src/layout/MainLayout.jsx
import React from "react";
import { Box, CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const drawerWidth = 240;

const MainLayout = () => {
  return (
    <Box sx={{ display: "flex", backgroundColor: "#F1F8E9", minHeight: "100vh" }}>
      <CssBaseline />

      {/* Sidebar */}
      <Sidebar />

      {/* Navbar */}
      <Navbar drawerWidth={drawerWidth} />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8,
          backgroundColor: "#F1F8E9",
          minHeight: "100vh",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
