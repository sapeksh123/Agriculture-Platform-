

// import React from "react";
// import { Box, Button, Typography, Stack, IconButton } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { useTheme } from "@mui/material/styles";
// import { useColorMode } from "../core/theme/ThemeProvider";
// import LightModeIcon from "@mui/icons-material/LightMode";
// import DarkModeIcon from "@mui/icons-material/DarkMode";

// const Welcome = () => {
//   const navigate = useNavigate();
//   const theme = useTheme();
//   const { toggleColorMode } = useColorMode();

//   return (
//     <Box
//       sx={{
//         height: "100vh",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//         textAlign: "center",
//         background:
//           theme.palette.mode === "light"
//             ? "linear-gradient(135deg, #e8f5e9, #f1f8e9)"
//             : "linear-gradient(135deg, #1c3824ff, #24562cff)",
//         transition: "background 0.5s ease-in-out",
//         position: "relative",
//       }}
//     >
//       {/* Theme Toggle Button - Top Right */}
//       <IconButton
//         onClick={toggleColorMode}
//         sx={{
//           position: "absolute",
//           top: 20,
//           right: 20,
//           color: theme.palette.mode === "light" ? "#2e7d32" : "#c8e6c9",
//           transition: "transform 0.2s ease-in-out",
//           "&:hover": { transform: "rotate(20deg)" },
//         }}
//       >
//         {theme.palette.mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
//       </IconButton>

//       {/* Main Content */}
//       <Stack direction="column" alignItems="center" spacing={2}>
//         <Typography
//           variant="h3"
//           sx={{
//             fontWeight: 600,
//             color:
//               theme.palette.mode === "light"
//                 ? "#2e7d32"
//                 : theme.palette.primary.main,
//             letterSpacing: "1px",
//           }}
//         >
//           Welcome to
//         </Typography>

//         {/* Logo replacing 'GrowEdge' text */}
//         <Box
//           component="img"
//           src="/urllogo.png"
//           alt="GrowEdge Logo"
//           sx={{
//             height: { xs: 70, sm: 90, md: 110 },
//             objectFit: "contain",
//             mb: 1,
//             filter:
//               theme.palette.mode === "light"
//                 ? "drop-shadow(0px 4px 8px rgba(0,0,0,0.2))"
//                 : "drop-shadow(0px 4px 10px rgba(255,255,255,0.2))",
//             transition: "filter 0.3s ease",
//           }}
//         />

//         <Typography
//           variant="h6"
//           sx={{
//             color:
//               theme.palette.mode === "light"
//                 ? "#4e342e"
//                 : theme.palette.text.secondary,
//             mb: 3,
//             fontWeight: 400,
//             fontStyle: "italic",
//             transition: "color 0.3s ease",
//           }}
//         >
//           Empowering Agriculture with Technology
//         </Typography>

//         <Button
//           variant="contained"
//           size="large"
//           sx={{
//             backgroundColor:
//               theme.palette.mode === "light"
//                 ? "#2e7d32"
//                 : theme.palette.primary.main,
//             px: 4,
//             py: 1.2,
//             borderRadius: 3,
//             color: "#fff",
//             "&:hover": {
//               backgroundColor:
//                 theme.palette.mode === "light"
//                   ? "#1b5e20"
//                   : theme.palette.secondary.main,
//               transform: "scale(1.03)",
//               transition: "all 0.2s ease-in-out",
//             },
//           }}
//           onClick={() => navigate("/login")}
//         >
//           Get Started
//         </Button>
//       </Stack>
//     </Box>
//   );
// };

// export default Welcome;

import React from "react";
import { Box, Button, Typography, Stack, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { useColorMode } from "../core/theme/ThemeProvider"; // adjust path if needed
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

const Welcome = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { toggleColorMode } = useColorMode();

  // 🌗 Dynamic logo based on theme mode
  const logoSrc =
    theme.palette.mode === "light" ? "/urllogo.png" : "/dark.png";

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        background:
          theme.palette.mode === "light"
            ? "linear-gradient(135deg, #e8f5e9, #f1f8e9)"
            : "linear-gradient(135deg, #05120aff, #0f2615)",
        transition: "background 0.4s ease",
      }}
    >
      {/* 🌗 Theme Toggle Button (top-right corner) */}
      <IconButton
        onClick={toggleColorMode}
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          color: theme.palette.text.primary,
          backgroundColor:
            theme.palette.mode === "light" ? "#ffffffaa" : "#1b3320aa",
          border: "1px solid rgba(255,255,255,0.2)",
          "&:hover": {
            backgroundColor:
              theme.palette.mode === "light"
                ? "#f1f1f1"
                : "rgba(255,255,255,0.1)",
          },
        }}
      >
        {theme.palette.mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
      </IconButton>

      {/* Welcome Heading + Logo */}
      <Stack direction="column" alignItems="center" spacing={2}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 600,
            color:
              theme.palette.mode === "light"
                ? "#2e7d32"
                : theme.palette.text.primary,
            letterSpacing: "1px",
          }}
        >
          Welcome to
        </Typography>

        {/* 🌿 Dynamic Logo */}
        <Box
          component="img"
          src={logoSrc}
          alt="GrowEdge Logo"
          sx={{
            height: { xs: 70, sm: 90, md: 110 },
            objectFit: "contain",
            mb: 1,
            filter:
              theme.palette.mode === "light"
                ? "drop-shadow(0px 4px 8px rgba(0,0,0,0.2))"
                : "drop-shadow(0px 4px 10px rgba(255,255,255,0.2))",
            transition: "filter 0.3s ease, transform 0.3s ease",
          }}
        />

        <Typography
          variant="h6"
          sx={{
            color:
              theme.palette.mode === "light"
                ? "#4e342e"
                : theme.palette.text.secondary,
            mb: 3,
            fontWeight: 400,
            fontStyle: "italic",
          }}
        >
          Empowering Agriculture with Technology
        </Typography>

        <Button
          variant="contained"
          size="large"
          sx={{
            backgroundColor:
              theme.palette.mode === "light" ? "#2e7d32" : "#66bb6a",
            px: 4,
            py: 1.2,
            borderRadius: 3,
            "&:hover": {
              backgroundColor:
                theme.palette.mode === "light" ? "#1b5e20" : "#81c784",
              transform: "scale(1.03)",
              transition: "all 0.2s ease-in-out",
            },
          }}
          onClick={() => navigate("/login")}
        >
          Get Started
        </Button>
      </Stack>
    </Box>
  );
};

export default Welcome;
