import React from "react";
import { Box, Typography, Button } from "@mui/material";

const VerifyEmail = () => {
  return (
    <Box sx={{ padding: { xs: "10px", sm: "20px" } }}>
      <Box
        sx={{
          maxWidth: "600px",
          margin: "0 auto",
          textAlign: "center",
          padding: { xs: "20px", sm: "40px" },
          borderRadius: "10px",
          backgroundColor: "#fff",
        }}
      >
        <Box
          sx={{
            mb: 3,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* <img
            src="/Logo.webp"
            alt="Logo"
            style={{ maxWidth: "150px", width: "100%" }}
          /> */}
        </Box>

        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", fontSize: { xs: "1.5rem", sm: "2rem" } }}
        >
          Hi <span style={{ fontWeight: "bolder" }}>Hamza</span>,
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: "1rem", sm: "1.25rem", md:"30px"  },
            lineHeight: { xs: "1.5rem", sm: "1.75rem", md:"43px" },
            mb: 3,
          }}
        >
          Just a friendly reminder to <br /> verify your email address.
        </Typography>

        <Typography
          variant="body2"
          sx={{
            mb: 4,
            lineHeight: "1.6",
            color: "#555",
            fontSize: { xs: "0.9rem", sm: "1rem" },
          }}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
          perspiciatis voluptas provident, quisquam cum ducimus distinctio
          provident, quisquam.
        </Typography>

        <Button
          variant="contained"
          sx={{
            backgroundColor: "#0294D3",
            color: "white",
            padding: { xs: "10px 16px", sm: "12px 19px", md:'8px' },
            width: { xs: "100%", sm: "70%" },
            fontSize: { xs: "0.9rem", sm: "1rem" },
            "&:hover": {
              backgroundColor: "#027bb3",
            },
          }}
        >
          Verify Email Address
        </Button>
      </Box>

      <Box sx={{ width: "100%", mt: 5 }}>
        <hr />
      </Box>

      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography
          variant="body1"
          sx={{ mb: 3, fontSize: { xs: "0.9rem", sm: "1rem" } }}
        >
          This email was sent to{" "}
          <Typography sx={{ color: "#0294D3", display: "inline-block" }}>
            khan@gmail.com
          </Typography>
          . If you'd rather not receive this kind of email, Don’t want any{" "}
          <br />
          more emails from Notable?{" "}
          <Typography sx={{ color: "#0294D3", display: "inline-block" }}>
            Unsubscribe.
          </Typography>
        </Typography>

        <Typography
          sx={{
            fontSize: { xs: "0.8rem", sm: "0.9rem" },
            lineHeight: "1.5rem",
            color: "#555",
          }}
        >
          1100 91-B Bahira Town, Lahore <br />© 2024 Leaning1
        </Typography>
      </Box>
    </Box>
  );
};

export default VerifyEmail;
