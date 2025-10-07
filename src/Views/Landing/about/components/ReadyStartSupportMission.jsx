import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const ReadyStartSupportMission = () => {
  const theme = useTheme();

  return (
    <>
      {/* <Box
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
            Ready to Start?
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "gray",
              lineHeight: 1.8,
            }}
          >
            Explore our video library today and experience learning Arabic as
            effortlessly as streaming your favorite show. Go Premium for just
            $14.99/month and enjoy unlimited access to our entire library, with
            three exclusive new videos added daily—bringing you closer to
            fluency, one story at a time.
          </Typography>

          <Stack direction="row" gap={3}>
            <Button
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              sx={{
                backgroundColor: theme.palette.color.customOrange,
                textTransform: "none", 
                fontWeight: "bold",
                borderRadius: "48px",
                color: "white",
                boxShadow: "none",
                width: "max-content",
                mt: { xs: 4, sm: 5, md: 10 },
                px: 4,
                "&:hover": {
                  backgroundColor: theme.palette.color.customOrangeDark, 
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                },
                "&:focus": {
                  outline: "none",
                  boxShadow: "0 0 0 4px rgba(255, 165, 0, 0.3)", 
                },
              }}
            >
              Start Watching Now
            </Button>
            <Button
              variant="contained"
              endIcon={
                <ArrowForwardIcon
                  sx={{ color: theme.palette.color.customPurple }}
                />
              }
              sx={{
                backgroundColor: "transparent",
                textTransform: "none",
                fontWeight: "bold",
                borderRadius: "48px",
                color: theme.palette.color.customOrange,
                boxShadow: "none",
                width: "max-content",
                mt: { xs: 4, sm: 5, md: 10 },
                px: 4,
                border: `1px solid ${theme.palette.color.customOrange}`,
                "&:hover": {
                  backgroundColor: theme.palette.color.customOrangeDark, 
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                },
              }}
            >
              Go Premium
            </Button>
          </Stack>
        </Box>
      </Box> */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row-reverse" },
          alignItems: { xs: "center", md: "start" },
          justifyContent: "center",
          gap: { xs: 3, md: 6 },
          paddingY: 4,
          paddingX: 6,
          backgroundColor:"white"
        }}
      >
        {/* Image Section */}
        <Box
          component="img"
          src="/laptopgirl.png"
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
            Support our Mission
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "gray",
              lineHeight: 1.8,
            }}
          >
            Join us in sharing the beauty of Arabic with the world! We have a
            bold vision to make Arabic accessible, enjoyable, and immersive for
            everyone, but we can’t do it alone. Your contribution—big or
            small—helps us create more engaging videos, expand our cultural
            stories, and reach learners worldwide. Together, let’s share the
            richness of the Arabic language and culture, making Arabic learning
            a global celebration.
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
            Support Us Today
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default ReadyStartSupportMission;
