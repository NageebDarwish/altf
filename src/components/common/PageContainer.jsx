import React from 'react';
import { Box, Container } from '@mui/material';
import PropTypes from 'prop-types';

/**
 * Standardized page container component
 * Provides consistent layout and spacing across pages
 */
const PageContainer = ({
  children,
  maxWidth = 'lg',
  disableGutters = false,
  sx = {},
  ...props
}) => {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 3,
        ...sx,
      }}
      {...props}
    >
      <Container
        maxWidth={maxWidth}
        disableGutters={disableGutters}
      >
        {children}
      </Container>
    </Box>
  );
};

PageContainer.propTypes = {
  children: PropTypes.node.isRequired,
  maxWidth: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', false]),
  disableGutters: PropTypes.bool,
  sx: PropTypes.object,
};

export default PageContainer;
