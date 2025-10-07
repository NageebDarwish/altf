import React from 'react';
import { Box, Typography, CircularProgress, Button, Grid } from '@mui/material';
import { useInfiniteVideoScroll, useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { API_ENDPOINTS } from '../config/api';
import YoutubeCard from '../Views/WatchVideos/YoutubeCard';

/**
 * Example component demonstrating how to use infinite scroll pagination
 * This shows different ways to implement infinite scroll in your components
 */

// Example 1: Using the specialized video infinite scroll hook
export const VideoInfiniteScrollExample = () => {
  const {
    data: videos,
    loading,
    loadingMore,
    error,
    hasMore,
    loadMore,
    refresh,
    lastElementRef,
  } = useInfiniteVideoScroll({
    perPage: 15,
    enableAutoLoad: true,
  });

  if (loading && videos.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" p={4}>
        <Typography color="error" gutterBottom>
          Error loading videos: {error}
        </Typography>
        <Button onClick={refresh} variant="contained">
          Try Again
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Video Infinite Scroll Example
      </Typography>
      
      <Grid container spacing={2}>
        {videos.map((video, index) => (
          <Grid item xs={12} sm={6} md={4} key={`${video.id}-${index}`}>
            <YoutubeCard
              video={video}
              title={video.title}
              description={video.description}
              buttonText={video.level}
              // ... other props
            />
          </Grid>
        ))}
      </Grid>

      {/* Infinite scroll trigger */}
      {hasMore && (
        <Box ref={lastElementRef} textAlign="center" p={2}>
          {loadingMore ? (
            <CircularProgress />
          ) : (
            <Typography variant="body2" color="text.secondary">
              Scroll down to load more videos...
            </Typography>
          )}
        </Box>
      )}

      {/* Manual load more button */}
      {hasMore && !loadingMore && (
        <Box textAlign="center" p={2}>
          <Button onClick={loadMore} variant="contained">
            Load More Videos
          </Button>
        </Box>
      )}

      {/* Refresh button */}
      <Box textAlign="center" p={2}>
        <Button onClick={refresh} variant="outlined">
          Refresh All Videos
        </Button>
      </Box>
    </Box>
  );
};

// Example 2: Using the generic infinite scroll hook with custom endpoint
export const CustomInfiniteScrollExample = () => {
  const {
    data: items,
    loading,
    loadingMore,
    error,
    hasMore,
    loadMore,
    currentPage,
    totalPages,
    total,
  } = useInfiniteScroll('api/custom-endpoint', {
    perPage: 10,
    initialPage: 1,
    enableAutoLoad: true,
  });

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Custom Endpoint Infinite Scroll
      </Typography>
      
      <Typography variant="body1" gutterBottom>
        Page {currentPage} of {totalPages} (Total: {total} items)
      </Typography>

      {loading && items.length === 0 && (
        <Box display="flex" justifyContent="center" p={4}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Typography color="error" gutterBottom>
          Error: {error}
        </Typography>
      )}

      <Box>
        {items.map((item, index) => (
          <Box key={`${item.id}-${index}`} p={2} borderBottom="1px solid #eee">
            <Typography variant="h6">{item.title}</Typography>
            <Typography variant="body2" color="text.secondary">
              {item.description}
            </Typography>
          </Box>
        ))}
      </Box>

      {hasMore && (
        <Box textAlign="center" p={2}>
          <Button 
            onClick={loadMore} 
            disabled={loadingMore}
            variant="contained"
          >
            {loadingMore ? 'Loading...' : 'Load More'}
          </Button>
        </Box>
      )}
    </Box>
  );
};

// Example 3: Using infinite scroll with dependencies (resets when dependencies change)
export const DependentInfiniteScrollExample = ({ categoryId, searchTerm }) => {
  const {
    data: videos,
    loading,
    loadingMore,
    error,
    hasMore,
    loadMore,
  } = useInfiniteVideoScroll({
    perPage: 12,
    dependencies: [categoryId, searchTerm], // Will reset when these change
    enableAutoLoad: true,
  });

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Category: {categoryId}, Search: {searchTerm}
      </Typography>
      
      {loading && videos.length === 0 ? (
        <Box display="flex" justifyContent="center" p={4}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={2}>
          {videos.map((video, index) => (
            <Grid item xs={12} sm={6} md={4} key={`${video.id}-${index}`}>
              <Box p={2} border="1px solid #ddd" borderRadius={1}>
                <Typography variant="h6" gutterBottom>
                  {video.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {video.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}

      {hasMore && (
        <Box textAlign="center" p={2}>
          <Button 
            onClick={loadMore} 
            disabled={loadingMore}
            variant="contained"
          >
            {loadingMore ? 'Loading...' : 'Load More'}
          </Button>
        </Box>
      )}

      {error && (
        <Typography color="error" textAlign="center" p={2}>
          Error: {error}
        </Typography>
      )}
    </Box>
  );
};

// Example 4: Manual infinite scroll (without auto-loading)
export const ManualInfiniteScrollExample = () => {
  const {
    data: videos,
    loading,
    loadingMore,
    error,
    hasMore,
    loadMore,
  } = useInfiniteVideoScroll({
    perPage: 20,
    enableAutoLoad: false, // Manual loading only
  });

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Manual Load Infinite Scroll
      </Typography>
      
      <Typography variant="body1" gutterBottom>
        This example only loads data when you click the "Load More" button.
        No automatic scrolling or intersection observer is used.
      </Typography>

      {loading && videos.length === 0 && (
        <Box display="flex" justifyContent="center" p={4}>
          <CircularProgress />
        </Box>
      )}

      <Grid container spacing={2}>
        {videos.map((video, index) => (
          <Grid item xs={12} sm={6} md={4} key={`${video.id}-${index}`}>
            <Box p={2} border="1px solid #ddd" borderRadius={1}>
              <Typography variant="h6" gutterBottom>
                {video.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {video.description}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      {hasMore && (
        <Box textAlign="center" p={2}>
          <Button 
            onClick={loadMore} 
            disabled={loadingMore}
            variant="contained"
            size="large"
          >
            {loadingMore ? (
              <>
                <CircularProgress size={20} sx={{ mr: 1 }} />
                Loading More Videos...
              </>
            ) : (
              'Load More Videos'
            )}
          </Button>
        </Box>
      )}

      {!hasMore && videos.length > 0 && (
        <Box textAlign="center" p={2}>
          <Typography variant="body2" color="text.secondary">
            No more videos to load
          </Typography>
        </Box>
      )}

      {error && (
        <Typography color="error" textAlign="center" p={2}>
          Error: {error}
        </Typography>
      )}
    </Box>
  );
};

export default {
  VideoInfiniteScrollExample,
  CustomInfiniteScrollExample,
  DependentInfiniteScrollExample,
  ManualInfiniteScrollExample,
};
