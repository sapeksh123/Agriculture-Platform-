import React from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  IconButton,
  useTheme,
} from "@mui/material";
import {
  Dashboard,
  People,
  Settings,
  Logout,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useColorMode } from "../../core/theme/ThemeProvider";

const drawerWidth = 240;

const Sidebar = ({ role = "admin" }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { toggleColorMode } = useColorMode();

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // 🎯 Define menu items (can be dynamic by role)
  const menuItems = [
    { text: "Dashboard", icon: <Dashboard />, path: "/dashboard" },
    { text: "Users", icon: <People />, path: "/users" },
    { text: "Settings", icon: <Settings />, path: "/settings" },
    { text: "Logout", icon: <Logout />, path: "/logout" },
  ];

  // 🎨 Drawer content
  const drawerContent = (
    <Box
      sx={{
        height: "100%",
        backgroundColor:
          theme.palette.mode === "light"
            ? "#e8f5e9"
            : "#05120aff", // dark green background
        color: theme.palette.text.primary,
      }}
    >
      {/* Logo + Title */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
          borderBottom: `1px solid ${
            theme.palette.mode === "light" ? "#c8e6c9" : "#1b3320"
          }`,
        }}
      >
        <Box
          component="img"
          src={
            theme.palette.mode === "light"
              ? "/logo-light.png"
              : "/logo-dark.png"
          }
          alt="Logo"
          sx={{
            height: 40,
            objectFit: "contain",
            mr: 1,
            transition: "0.3s",
          }}
        />
        <Typography variant="h6" fontWeight="bold">
          GrowEdge
        </Typography>
      </Box>

      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              onClick={() => navigate(item.path)}
              sx={{
                "&:hover": {
                  backgroundColor:
                    theme.palette.mode === "light"
                      ? "rgba(46, 125, 50, 0.1)"
                      : "rgba(129, 199, 132, 0.1)",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: theme.palette.primary.main,
                  minWidth: 40,
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{ fontSize: 15, fontWeight: 500 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ mt: "auto", borderColor: "rgba(255,255,255,0.1)" }} />

      {/* Toggle theme button at bottom */}
      <Box sx={{ textAlign: "center", p: 2 }}>
        <Typography
          onClick={toggleColorMode}
          sx={{
            cursor: "pointer",
            fontSize: 14,
            color: theme.palette.text.secondary,
            "&:hover": { color: theme.palette.primary.main },
          }}
        >
          Toggle Theme
        </Typography>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{
          display: { sm: "none" },
          position: "fixed",
          top: 10,
          left: 10,
          zIndex: 2000,
        }}
      >
        <MenuIcon />
      </IconButton>

      {/* Permanent Drawer for Desktop */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            border: "none",
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>

      {/* Temporary Drawer for Mobile */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // better performance on mobile
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            border: "none",
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Sidebar;
