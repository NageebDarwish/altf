import { Box, Button, Grid, Stack, Typography, useTheme } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const ImmerseYourself = () => {
  const theme = useTheme();
  return (
    <Box sx={{ py: 8, px: 6, backgroundColor: '#FFEBDB', }}>
      {/* Title Section */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          fontWeight="bold"
          gutterBottom
          sx={{
            color: "text.primary",
            width: "max-content",
            pb: 1.4,
            // borderBottom: `3px solid ${theme.palette.color.customPurple}`,
            textWrap: "wrap",
          }}
        >
          Immerse Yourself in Arabic Effortlessly
        </Typography>
        <Typography
          sx={{
            color: "text.secondary",
            // maxWidth: 800,
            margin: "0",
            fontSize: "15px",
          }}
        >
          Welcome to Arabic All The Time! Experience the beauty and warmth of
          Arabic language and culture in a way that feels as easy as streaming
          your favorite show. Inspired by the revolutionary use of
          comprehensible input, our immersive approach allows you to acquire
          Arabic naturally—effortlessly connecting with stories, culture, and
          language.
        </Typography>
        <Typography
          sx={{
            color: "text.secondary",
            // maxWidth: 800,
            margin: "0",
            fontSize: "15px",
            mt: 2,
          }}
        >
          Just like tuning into YouTube or Netflix, Arabic All The Time is a
          space for stories, entertainment, and cultural insights. Here, you’re
          drawn into captivating content, seamlessly absorbing Arabic as part of
          the experience. Connect with the language and culture as easily as you
          would with a favorite show, merging entertainment with meaningful
          learning.
        </Typography>
      </Box>

      {/* Content Section */}
      <Grid container spacing={4}>
        {/* Left Section */}
        <Grid item xs={12} md={6}>
          <Box
            flex={1}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
            }}
          >
            <Stack direction="column">
              <Stack direction={"row"} alignItems={"center"} gap={2}>
                <Typography
                  variant="h9"
                  sx={{
                    fontWeight: "bold",
                    color: theme.palette.color.customOrange,
                    textTransform: "uppercase",
                  }}
                >
                  Story
                </Typography>
                <Typography
                  variant="h5"
                  component="h2"
                  fontWeight="bold"
                  sx={{ color: theme.palette.color.customPurple }}
                >
                  From Struggle to Inspiration
                </Typography>
              </Stack>
              <Typography
                variant="body1"
                sx={{ color: "text.secondary", mt: 2 }}
              >
                Arabic All The Time was born out of Hasan’s transformative journey-one that started with the challenges of traditional language learning and led to the discovery of a revolutionary approach. Learn how this journey inspired a mission to make Arabic learning natural, effortless, and accessible for everyone.
              </Typography>
            </Stack>
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
              Read Our Story
            </Button>
          </Box>
        </Grid>

        {/* Right Section */}
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src="/immersepic.webp" // Place the image in the public/images folder
            alt="Inspiration"
            sx={{
              width: "100%",
              objectFit: "cover",
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ImmerseYourself;
