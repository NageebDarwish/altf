import {
  Typography,
  Stack,
  useTheme,
  Box,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  Divider,
} from "@mui/material";
import ProgressCard from "./ProgressCard";
import { progressCards } from "../../../utils/constants";

const TrackProgress = () => {
  const theme = useTheme();

  return (
    <Stack sx={{ px: 6, gap: 3 }}>
      <Typography sx={{ fontSize: "26px", fontWeight: 700 }}>
        How to Track Your Progress?
      </Typography>
      <Typography
        sx={{
          fontWeight: 500,
          fontSize: "14px",
          color: theme.palette.color.greyText,
        }}
      >
        As you continue to immerse yourself, you’ll start noticing clear, though
        sometimes subtle, signs that your understanding is steadily growing.
        Language acquisition through immersion is gradual, with each step
        building on the last, deepening your comprehension over time. Here’s how
        you’ll recognize progress as Arabic begins to feel more natural:
      </Typography>

      {/* Text Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
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
            Journey
          </Typography>
          <Typography
            variant="h5"
            component="h2"
            fontWeight="bold"
            sx={{ color: theme.palette.color.customPurple }}
          >
            Signs of Progress in Your Language Journey
          </Typography>
        </Stack>
        <Typography
          variant="body1"
          sx={{
            color: theme.palette.color.darkGrey,
            lineHeight: 1.8,
          }}
        >
          Immersion-based acquisition doesn’t yield immediate fluency—it’s a
          steady, cumulative process where understanding unfolds naturally.
        </Typography>

        {/* Progress Cards */}

        <Box sx={{ p: 4 }}>
          <Grid container spacing={4}>
            {progressCards.map((item) => (
              <ProgressCard
                key={item.id}
                id={item.id}
                title={item.title}
                points={item.points}
              />
            ))}
          </Grid>
        </Box>
      </Box>
    </Stack>
  );
};

export default TrackProgress;
