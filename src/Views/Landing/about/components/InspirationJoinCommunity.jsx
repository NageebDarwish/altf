import { Box, Button, Typography, useTheme } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const InspirationJoinCommunity = () => {
  const theme = useTheme();
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "center", md: "start" },
          justifyContent: "center",
          gap: { xs: 3, md: 6 },
          backgroundColor: theme.palette.color.missionBackground,
          paddingY: 4,
          paddingX: 6,
          boxShadow: "none",
        }}
      >
        {/* Image Section */}
        <Box
          component="img"
          src={"/pic2.png"}
          alt={"girls-on-stairs.svg"}
          sx={{
            width: { xs: "100%", md: "45%" },
            height: "auto",
            objectFit: "cover",
          }}
        />

        {/* Text Section */}
        <Box
          sx={{
            width: { xs: "100%", md: "45%" },
            textAlign: { xs: "center", md: "left" },
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              marginBottom: 2,
            }}
          >
            Inspiration
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "gray",
              lineHeight: 1.8,
            }}
          >
            Our approach is inspired by Dreaming Spanish, a platform that
            demonstrated the transformative power of comprehensible input. By
            adapting this method for Arabic, we allow language acquisition to
            feel intuitive and enjoyable—similar to watching a favorite show,
            where learning happens naturally while enjoying meaningful content.
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row-reverse" },
          alignItems: { xs: "center", md: "start" },
          justifyContent: "center",
          gap: { xs: 3, md: 6 },
          paddingY: 4,
          paddingX: 6,
        }}
      >
        {/* Image Section */}
        <Box
          component="img"
          src={"/pic2.png"}
          alt={"girls-on-stairs.svg"}
          sx={{
            width: { xs: "100%", md: "45%" },
            height: "auto",
            objectFit: "cover",
          }}
        />

        {/* Text Section */}
        <Box
          sx={{
            width: { xs: "100%", md: "45%" },
            textAlign: { xs: "center", md: "left" },
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              marginBottom: 2,
            }}
          >
            Join Our Community
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "gray",
              lineHeight: 1.8,
            }}
          >
            Arabic All The Time is dedicated to building a global community of
            Arabic enthusiasts. Our interactive discussion forum invites you to
            ask questions, share insights, and connect with others from around
            the world. In this supportive space, you can deepen cultural
            connections, explore language together, gain support from fellow
            learners, and celebrate milestones. Here, Arabic is shared and
            experienced—not just studied.
          </Typography>

          <Button
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            sx={{
              backgroundColor: theme.palette.color.customOrange, // Custom orange from the theme
              textTransform: "none", // Disable uppercase transformation
              fontWeight: "bold",
              borderRadius: "48px",
              color: "white",
              boxShadow: "none",
              width: "max-content",
              mt: { xs: 4, sm: 5, md: 10 },
              px: 4, // Padding for better button size
              "&:hover": {
                backgroundColor: theme.palette.color.customOrangeDark, // Slightly darker on hover
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // Add hover shadow
              },
              "&:focus": {
                outline: "none",
                boxShadow: "0 0 0 4px rgba(255, 165, 0, 0.3)", // Accessible focus outline
              },
            }}
          >
            Community
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default InspirationJoinCommunity;
