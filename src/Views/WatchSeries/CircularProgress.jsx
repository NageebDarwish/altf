import { CircularProgress, Box, Typography } from "@mui/material";

const CircularProgressComponent = ({ progress }) => {
  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
        width: 100,
        height: 100,
      }}
    >
      {/* Circular Progress with custom track */}
      <CircularProgress
        variant="determinate"
        value={100}
        sx={{
          color: "rgba(255, 255, 255,0.3)", // off-white color (track)
        }}
        size={100}
        thickness={4}
      />
      <CircularProgress
        variant="determinate"
        value={progress}
        sx={{
          color: "rgba(255,255,255)", // Blue color for progress
          position: "absolute",
          top: 0,
          left: 0,
        }}
        size={100}
        thickness={4}
      />

      {/* Centered text */}
      <Typography
        variant="h12"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontWeight: "bold",
          color: "rgba(255,255,255)",
          textAlign: "center",
        }}
      >
        {`${progress}%`}
        <span style={{ display: "inline-block" }}>watched</span>
      </Typography>
    </Box>
  );
};

export default CircularProgressComponent;
