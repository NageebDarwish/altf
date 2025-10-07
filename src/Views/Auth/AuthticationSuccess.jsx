import React from "react";
import { Box, Typography, Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

// AuthenticationSuccess.jsx
const AuthenticationSuccess = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mt: 6,
      }}
    >
      <Box
        sx={{
          textAlign: "center",

          padding: { xs: "20px", sm: "40px" },
          borderRadius: "10px",
        }}
      >
        <CheckCircleIcon
          sx={{
            fontSize: { xs: "60px", sm: "80px", md: "100px" },
            color: "#0294D3",
            mb: 2,
          }}
        />

        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            fontSize: { xs: "1.5rem", sm: "2rem" },
            mb: 1,
          }}
        >
          Authentication Completed
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: "1rem", sm: "1.25rem", md: "15px" },
            lineHeight: "1.75rem",
            mb: 3,
            color: "#555",
          }}
        >
          Your authentication has been completed successfully.
        </Typography>

        <Button
          variant="contained"
          sx={{
            backgroundColor: "#0294D3",
            color: "white",
            width: "100%",
            padding: { xs: "10px 16px", sm: "12px 24px" },
            fontSize: { xs: "0.9rem", sm: "1rem" },
            "&:hover": {
              backgroundColor: "#027bb3",
            },
          }}
        >
          Dashboard
        </Button>
      </Box>
    </Box>
  );
};

export default AuthenticationSuccess;
