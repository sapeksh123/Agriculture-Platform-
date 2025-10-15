// src/components/Sidebar.jsx
import React from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Switch,
  Box,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import ReportIcon from "@mui/icons-material/Assessment";
import SettingsIcon from "@mui/icons-material/Settings";
import { useColorMode } from "../theme/AppThemeProvider";

const menuItemsByRole = {
  admin: [
    { text: "Dashboard", icon: <DashboardIcon /> },
    { text: "Manage Users", icon: <PeopleIcon /> },
    { text: "Reports", icon: <ReportIcon /> },
    { text: "Settings", icon: <SettingsIcon /> },
  ],
  moderator: [
    { text: "Dashboard", icon: <DashboardIcon /> },
    { text: "Reports", icon: <ReportIcon /> },
  ],
  user: [{ text: "Dashboard", icon: <DashboardIcon /> }],
};

export default function Sidebar({ role = "user", drawerWidth = 240 }) {
  const { toggleColorMode } = useColorMode();
  const menuItems = menuItemsByRole[role] || menuItemsByRole.user;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          MyApp
        </Typography>
        <Divider />
        <List>
          {menuItems.map((item) => (
            <ListItemButton key={item.text}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}
        </List>
        <Divider sx={{ my: 2 }} />
        <Box display="flex" alignItems="center" justifyContent="space-between" px={2}>
          <Typography variant="body2">Dark Mode</Typography>
          <Switch onChange={toggleColorMode} />
        </Box>
      </Box>
    </Drawer>
  );
}
