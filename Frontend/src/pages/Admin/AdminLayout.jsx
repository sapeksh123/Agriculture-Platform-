// src/pages/Admin/AdminLayout.jsx
import React from "react";
import { Box } from "@mui/material";
import Sidebar from "../../components/Sidebar";

export default function AdminLayout({ children }) {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar role="admin" />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </Box>
  );
}
