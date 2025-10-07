import React from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

/**
 * Standardized loading spinner component
 */
const LoadingSpinner = ({
  size = 40,
  message = 'Loading...',
  fullScreen = false,
  color = 'primary',
  ...props
}) => {
  const content = (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={2}
      {...props}
    >
      <CircularProgress size={size} color={color} />
      {message && (
        <Typography variant="body2" color="textSecondary">
          {message}
        </Typography>
      )}
    </Box>
  );

  if (fullScreen) {
    return (
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        bottom={0}
        display="flex"
        alignItems="center"
        justifyContent="center"
        bgcolor="rgba(255, 255, 255, 0.8)"
        zIndex={9999}
      >
        {content}
      </Box>
    );
  }

  return content;
};

LoadingSpinner.propTypes = {
  size: PropTypes.number,
  message: PropTypes.string,
  fullScreen: PropTypes.bool,
  color: PropTypes.oneOf(['primary', 'secondary', 'inherit']),
};

export default LoadingSpinner;
