import { Box, Divider, Stack, Typography, useTheme } from "@mui/material";
import HowTheyDiffer from "./HowTheyDiffer";

const LearningAcquiringLanguage = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "start",
        justifyContent: "center",
        backgroundColor: "white",
        px: 6,
        paddingY: 4,
        gap: { xs: 3, md: 6 },
      }}
    >
      {/* Text Section */}
      <Box
        flex={1}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          width: { xs: "100%", md: "45%" },
          textAlign: { xs: "center", md: "left" },
        }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          alignItems={"start"}
          gap={2}
        >
          <Typography
            variant="h9"
            sx={{
              fontWeight: "bold",
              color: theme.palette.color.customOrange,
              textTransform: "uppercase",
              width: "max-content",
              borderBottom: `1px solid ${theme.palette.color.customOrange}`,
              pb: 1,
              fontSize: "12px",
              textWrap: "nowrap",
            }}
          >
            APPROACH
          </Typography>
          <Typography
            variant="h5"
            component="h2"
            fontWeight="bold"
            sx={{ color: theme.palette.color.customPurple }}
          >
            Learning vs. Acquiring a Language
          </Typography>
        </Stack>
        <Stack sx={{ gap: 3 }}>
          <Typography
            sx={{
              color: theme.palette.color.darkGrey,
              lineHeight: 1.8,
              fontSize: "16px",
            }}
          >
            Unlike traditional language learning, which relies on memorization,
            acquisition is a natural, subconscious process.
          </Typography>

          <Divider />
          <HowTheyDiffer />
        </Stack>
      </Box>

      {/* Image Section */}
      <Box
        flex={1}
        component="img"
        src="/headphone.png"
        alt={"girl on stairs"}
        sx={{
          width: { xs: "100%", md: "45%" },
          height: "auto",
          objectFit: "cover",
        }}
      />
    </Box>
  );
};

export default LearningAcquiringLanguage;
