import React from 'react';
import { Box, Typography, Paper , Button} from '@mui/material';
import './VedioPlateform.css'; 
import { useNavigate } from 'react-router-dom';
const VedioPlateform = () => {
    const navigate=useNavigate();
    const handleSkip = () => {
        navigate("/resources/subscriptions")
        console.log("Skipped");
      };
    
  return (
    <Box 
      className="video-container"
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh', 
        backgroundColor: 'black' 
      }}
    >
      <Paper elevation={3} sx={{ width: '100%', height: '100%', position: 'relative' }}>
        <video className="video-player" controls>
          <source src="your-video-url.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <Typography 
          variant="h6" 
          color="white" 
          sx={{ 
            position: 'absolute', 
            bottom: 20, 
            left: 20 
          }}
        >
          Video Title
        </Typography>
        <Button 
        variant="contained" 
        onClick={handleSkip} 
        sx={{ 
          position: 'absolute', 
          top: 20, 
          right: 20, 
          backgroundColor: '#0294D3',
          color: 'white',
          '&:hover': {
            backgroundColor: '#027BB5', 
          },
        }}
      >
        Skip
      </Button>
      </Paper>
    
    </Box>
  );
};

export default VedioPlateform;
