// src/pages/Admin/Dashboard.jsx
import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Chip,
} from "@mui/material";

const AdminDashboard = () => {
  // Example data
  const users = [
    { id: 1, name: "John Doe", role: "User", status: "Active" },
    { id: 2, name: "Jane Smith", role: "Moderator", status: "Inactive" },
    { id: 3, name: "Mike Johnson", role: "User", status: "Active" },
  ];

  const reports = [
    { id: 1, title: "Sales Report", date: "2025-10-15", status: "Completed" },
    { id: 2, title: "User Activity", date: "2025-10-14", status: "Pending" },
    { id: 3, title: "System Logs", date: "2025-10-13", status: "Completed" },
  ];

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" color="primary" gutterBottom>
        Admin Dashboard
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Welcome Admin, manage users and reports here.
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={2} sx={{ my: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: "#e3f2fd" }}>
            <CardContent>
              <Typography variant="h6">Total Users</Typography>
              <Typography variant="h4">120</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: "#fff3e0" }}>
            <CardContent>
              <Typography variant="h6">Active Reports</Typography>
              <Typography variant="h4">8</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: "#e8f5e9" }}>
            <CardContent>
              <Typography variant="h6">Pending Approvals</Typography>
              <Typography variant="h4">5</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: "#fce4ec" }}>
            <CardContent>
              <Typography variant="h6">System Alerts</Typography>
              <Typography variant="h4">2</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Users Table */}
      <Box sx={{ my: 4 }}>
        <Typography variant="h5" gutterBottom>
          Manage Users
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <Chip
                      label={user.status}
                      color={user.status === "Active" ? "success" : "default"}
                    />
                  </TableCell>
                  <TableCell>
                    <Button variant="contained" size="small" sx={{ mr: 1 }}>
                      Edit
                    </Button>
                    <Button variant="outlined" size="small" color="error">
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Reports Section */}
      <Box sx={{ my: 4 }}>
        <Typography variant="h5" gutterBottom>
          Recent Reports
        </Typography>
        <Grid container spacing={2}>
          {reports.map((report) => (
            <Grid item xs={12} sm={6} md={4} key={report.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{report.title}</Typography>
                  <Typography variant="body2" color="textS econdary">
                    Date: {report.date}  
                  </Typography>
                  <Chip  
                    label={report.status}
                    color={report.status === "Completed" ? "success" : "warning"}
                    sx={{ mt: 1 }}
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
