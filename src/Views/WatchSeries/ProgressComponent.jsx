import React from 'react';
import { Box, CircularProgress, LinearProgress, Typography, useTheme, useMediaQuery } from '@mui/material';

const ProgressComponent = ({ progress }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  if (isSmallScreen) {
    return (
      <Box sx={{
        width: '100%',
        display: 'flex',
        flexDirection: "column",
        alignItems: 'center',
        gap: 1,
        px: 2,
        py:2 
      }}>
        <Typography variant="body2" sx={{
          color: 'black',
          fontWeight: '400',
          alignSelf: 'flex-start'
        }}>
          {`${progress}% watched`}
        </Typography>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            width: '100%', 
            height: 14,
            borderRadius:"20px",
            backgroundColor: 'rgba(0,0,0,0.1)',
            '& .MuiLinearProgress-bar': {
              backgroundColor: 'rgb(242,131,39)',
            },
          }}
        />

      </Box>
    );
  }

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
      <CircularProgress
        variant="determinate"
        value={100}
        sx={{
          color: "rgba(255, 255, 255,0.3)",
        }}
        size={100}
        thickness={4}
      />
      <CircularProgress
        variant="determinate"
        value={progress}
        sx={{
          color: "rgb(242,131,39)",
          position: "absolute",
          top: 0,
          left: 0,
        }}
        size={100}
        thickness={4}
      />

      <Typography
        variant="body2"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontWeight: "bold",
          color: "rgba(255,255,255)",
          textAlign: "center",
          fontSize: '0.75rem',
        }}
      >
        {`${progress}%`}
        <span style={{ display: "block", fontSize: '0.6rem' }}>watched</span>
      </Typography>
    </Box>
  );
};

export default ProgressComponent;