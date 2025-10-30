import React from "react";
import { Box, Typography } from "@mui/material";
import Sidebar from "../../components/common/Sidebar";

const AdminDashboard = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar role="admin" />
      <Box sx={{ flexGrow: 1, p: 4 }}>
        <Typography variant="h4" color="primary" gutterBottom>
          Admin Dashboard
        </Typography>
        <Typography>
          Welcome, Admin! Manage users, data, and reports here.
        </Typography>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
