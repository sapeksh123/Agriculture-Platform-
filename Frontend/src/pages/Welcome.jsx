import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",    
        textAlign: "center",
      }}
    >
      <Typography variant="h3" color="primary" gutterBottom>
        Welcome to GrowEdge 🌱
      </Typography>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Empowering Agriculture with Technology
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/login")}
      >
        Start
      </Button>
    </Box>
  );
};

export default Welcome;
