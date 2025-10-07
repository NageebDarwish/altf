import React from "react";
import { Box, Grid, LinearProgress, Typography, Paper } from "@mui/material";
import StreakIcon from "@mui/icons-material/Stars";
import WeeksIcon from "@mui/icons-material/CalendarToday";
import TimeIcon from "@mui/icons-material/AccessTime";
import VideoIcon from "@mui/icons-material/PlayCircleFilled";
import BadgeIcon from "@mui/icons-material/EmojiEvents";
import LevelIcon from "@mui/icons-material/StarRate";
import DataCard from "./DataCard";
import CalenderComp from "./CalendarComp";

const ProgressClinder = ({ allGoals, userDetails, streaks }) => {
  const dailyStreak = 5;
  const weeksInARow = 0;
  const hoursWatched = 120;
  const videosWatched = 45;
  const outsideHours = 10;
  const currentLevel = 2;
  const hoursTillNextLevel = 30;
  const maxStreak = 7;
  const totalMinutes = 600;
  const levelDescription = "You're progressing well! Keep it up.";
  console.log(userDetails, "USER DETAILS");
  return (
    <Box sx={{ padding: 0, backgroundColor: "#f5f5f5", marginTop: "26px" }}>
      <Grid container spacing={2}>
        <Paper sx={{ width: "100%", padding: 2, marginTop: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Grid container direction="column" spacing={2}>
                <Grid item xs={12} marginTop={5}>
                  <DataCard
                    title="Daily Streak"
                    value={streaks?.length}
                    icon={<StreakIcon />}
                    backgroundColor="#f3f2f9"
                  >
                    <Typography variant="body2" color="textSecondary">
                      Days of consecutive viewing.
                    </Typography>
                  </DataCard>
                </Grid>
                <Grid item xs={12}>
                  <DataCard
                    title="Current Streak"
                    value={streaks?.length}
                    icon={<StreakIcon />}
                    backgroundColor="#f3f2f9"
                  >
                    <Typography variant="body2" color="textSecondary">
                      Reach a max streak of {maxStreak} by practicing every day.
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={(streaks?.length / maxStreak) * 100}
                      sx={{ marginTop: 1 }}
                    />
                    <Typography variant="caption" sx={{ marginTop: 1 }}>
                      {streaks?.length}/{maxStreak}
                    </Typography>
                  </DataCard>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
              <CalenderComp allGoals={allGoals} />
            </Grid>
          </Grid>
        </Paper>
        <Grid item xs={12} sm={4}>
          <DataCard
            title="Minute Progress Circle"
            value={`${(totalMinutes / 60).toFixed(2)} hrs`}
            icon={<TimeIcon />}
          >
            <LinearProgress
              variant="determinate"
              value={(totalMinutes % 60) * (100 / 60)}
              sx={{ marginTop: 1 }}
            />
            <Typography variant="caption" sx={{ marginTop: 1 }}>
              {totalMinutes} minutes watched
            </Typography>
          </DataCard>
        </Grid>
        <Grid item xs={12} sm={4}>
          <DataCard
            title="Weeks in a Row"
            value={weeksInARow}
            icon={<WeeksIcon />}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <DataCard
            title="Hours Watched"
            value={hoursWatched}
            icon={<TimeIcon />}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <DataCard
            title="Videos Watched"
            value={videosWatched}
            icon={<VideoIcon />}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <DataCard
            title="Outside Hours"
            value={outsideHours}
            icon={<TimeIcon />}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <DataCard
            title="Current Level"
            value={currentLevel}
            icon={<LevelIcon />}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <DataCard
            title="Hours till Next Level"
            value={hoursTillNextLevel}
            icon={<LevelIcon />}
          >
            <LinearProgress
              variant="determinate"
              value={(hoursTillNextLevel / 100) * 100}
              sx={{ marginTop: 1 }}
            />
            <Typography variant="caption" sx={{ marginTop: 1 }}>
              {hoursTillNextLevel} hours remaining
            </Typography>
          </DataCard>
        </Grid>

        <Grid item xs={12} sm={4}>
          <DataCard
            title="Level Description"
            value="Current Level"
            icon={<LevelIcon />}
          >
            <Typography variant="body2" color="textSecondary">
              {levelDescription}
            </Typography>
          </DataCard>
        </Grid>

        <Grid item xs={12} sm={4}>
          <DataCard title="Badges" value="Coming Soon" icon={<BadgeIcon />}>
            <Typography variant="body2" color="textSecondary">
              Badges will be provided later.
            </Typography>
          </DataCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProgressClinder;
