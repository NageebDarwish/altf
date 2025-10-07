import { Stack, Typography, useTheme } from "@mui/material";

const ImmerseApproach = () => {
  const theme = useTheme();
  return (
    <Stack gap={0.2} sx={{ py: 4, px: 6 }}>
      <Typography sx={{ fontSize: "26px", fontWeight: 700 }}>
        Welcome to Arabic All The Time – The Immersion Approach
      </Typography>
      <Typography
        sx={{
          fontWeight: 500,
          fontSize: "14px",
          color: theme.palette.color.greyText,
        }}
      >
        Imagine understanding Arabic as easily as your native language—no more
        grammar drills or flashcards, just immersive, enjoyable learning.
        Welcome to Arabic All The Time! Our immersion-based approach makes
        learning Arabic feel as natural as acquiring your first language. By
        focusing on watching and listening, you’ll allow your brain to absorb
        Arabic without memorization or grammar drills. Speaking isn’t rushed
        here; fluency is built first through exposure.
      </Typography>
      <Typography
        sx={{
          fontWeight: 500,
          fontSize: "14px",
          color: theme.palette.color.greyText,
          mt: 2,
        }}
      >
        In this guide, we’ll show you why traditional language learning falls
        short, introduce the concept of comprehensible input, and outline how
        our approach sets you on the path to Arabic fluency.
      </Typography>
    </Stack>
  );
};

export default ImmerseApproach;
