import { Box, Button, Typography, useTheme } from "@mui/material";

const ContactUs = () => {
  const theme = useTheme();
  return (
    <Box paddingX={{ xs: 2, sm: 4, md: 6 }}>
      {" "}
      {/* Adjust horizontal padding */}
      <Box
        flex={1}
        sx={{
          backgroundColor: theme.palette.color.candyOrange,
          borderRadius: "30px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: { xs: 3, md: 5 }, // Adjust gap between elements
          height: { xs: "auto", md: "284px" }, // Auto height for small screens
          px: { xs: 4, sm: 6, md: 8 }, // Adjust horizontal padding
          py: { xs: 4, md: 6 }, // Add vertical padding for small screens
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: "black",
            textAlign: "center",
            fontSize: { xs: "14px", sm: "16px", md: "18px", lg: "24px" },
          }}
        >
          We’d love to hear from you! Reach out through our Contact page,
          connect on social media, or email us directly with any questions.
          Let’s start learning Arabic—all the time, anytime.
        </Typography>
        <Button
          sx={{
            borderRadius: "30px",
            py: { xs: 1.5, md: 2 },
            px: { xs: 2, md: 3 },
            fontSize: { xs: "14px", md: "16px" },
            backgroundColor: theme.palette.color.customOrange,
            color: theme.palette.color.customWhite,
            fontWeight: "bold",
            textTransform: "none",
            "&:hover": {
              backgroundColor: theme.palette.color.customOrangeHover,
            },
          }}
        >
          Contact Us
        </Button>
      </Box>
    </Box>
  );
};

export default ContactUs;
