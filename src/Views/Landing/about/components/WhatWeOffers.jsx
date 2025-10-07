import { Box, Grid, Typography, useTheme } from "@mui/material";
import OfferCard from "./OfferCard";

const WhatWeOffers = () => {
  const offers = [
    {
      title: "Engaging Videos",
      description:
        "Content for all levels that builds vocabulary, comprehension, and cultural insights.",
      backgroundUrl: "/engaing-video.svg",
    },
    {
      title: "Cultural Immersion",
      description: "Stories that capture the warmth and depth of Arab culture.",
      backgroundUrl: "/immersion.svg",
    },
    {
      title: "Effortless Learning",
      description:
        "A journey that follows the brain’s natural language acquisition process, enabling learning without the need for formal study.",
      backgroundUrl: "/effortless-learning.svg",
    },
  ];

  const theme = useTheme();
  return (
    <Box
      sx={{
        py: 8,
        px: 6,
      }}
    >
      {/* Title Section */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          fontWeight="bold"
          gutterBottom
          sx={{
            width: "max-content",
            pb: 1.4,
            borderBottom: `3px solid ${theme.palette.color.customPurple}`,
            color: theme.palette.color.customPurple,
          }}
        >
          What We Offer
        </Typography>
        <Typography
          sx={{
            color: "grey",
            margin: "0",
            fontSize: "15px",
          }}
        >
          Arabic All The Time offers a Comprehensible Input Experience that
          turns learning Arabic into a rewarding part of your screen time.
          Inspired by Dreaming Spanish and scholars like Dr. Stephen Krashen and
          Dr. J. Marvin Brown, our video content immerses learners in both
          language and culture, blending education with entertainment.
        </Typography>
      </Box>

      {/* Content Section */}
      <Grid container spacing={4}>
        {/* Left Section */}

        {offers.map((card, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <OfferCard
              title={card.title}
              description={card.description}
              backgroundUrl={card.backgroundUrl}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default WhatWeOffers;
