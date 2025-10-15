import React, { useState } from "react";
import { Box, Button, TextField, Typography, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../core/context/AuthContext";

const Login = () => {
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(role, email);   

    switch (role) {
      case "admin":
        navigate("/admin/dashboard");
        break;
      case "owner":
        navigate("/owner/dashboard");
        break;
      case "shopkeeper":
        navigate("/shopkeeper/dashboard");
        break;
      case "farmer":
        navigate("/farmer/dashboard");
        break;
      default:
        alert("Select a role");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          bgcolor: "white",
          minWidth: 350,
        }}
      >
        <Typography variant="h5" mb={2} color="primary">
          Login to GrowEdge
        </Typography>
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          select
          label="Select Role"
          fullWidth
          margin="normal"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="owner">Owner</MenuItem>
          <MenuItem value="shopkeeper">Shopkeeper</MenuItem>
          <MenuItem value="farmer">Farmer</MenuItem>
        </TextField>
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
