# Infinite Scroll Pagination Guide

This guide explains how to implement and use infinite scroll pagination in the Arabic All The Times frontend application.

## Overview

The application now supports infinite scroll pagination for video lists, which provides a better user experience by loading content progressively as users scroll down. This system handles the new paginated API response format:

```json
{
  "success": true,
  "message": "All videos",
  "payload": {
    "current_page": 1,
    "data": [...],
    "first_page_url": "http://127.0.0.1:8000/api/videos?page=1",
    "from": 1,
    "last_page": 1,
    "last_page_url": "http://127.0.0.1:8000/api/videos?page=1",
    "links": [...],
    "next_page_url": null,
    "path": "http://127.0.0.1:8000/api/videos",
    "per_page": 15,
    "prev_page_url": null,
    "to": 8,
    "total": 8
  }
}
```

## Components Updated

### 1. API Configuration (`src/config/api.js`)

Added pagination support to API endpoints:

```javascript
videos: {
  list: 'videos',
  getPaginated: (page = 1, perPage = 15) => `videos?page=${page}&per_page=${perPage}`,
  getUserList: 'video/list',
  getUserHistory: 'video/history',
}
```

### 2. Infinite Scroll Hook (`src/hooks/useInfiniteScroll.js`)

Created a comprehensive hook for handling infinite scroll pagination:

```javascript
import { useInfiniteVideoScroll } from '../hooks/useInfiniteScroll';

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
```

### 3. Updated Components

- **WatchVideos.jsx** - Main video listing with infinite scroll
- **VideoList.jsx** - User's video list with pagination
- **WatchLibrary.jsx** - Library components with pagination
- **FilterVideo.jsx** - Filter functionality with paginated responses

## How to Use

### Basic Implementation

```javascript
import { useInfiniteVideoScroll } from '../hooks/useInfiniteScroll';

const MyVideoComponent = () => {
  const {
    data: videos,
    loading,
    loadingMore,
    error,
    hasMore,
    loadMore,
    lastElementRef,
  } = useInfiniteVideoScroll({
    perPage: 15,
    enableAutoLoad: true,
  });

  return (
    <div>
      {videos.map((video, index) => (
        <VideoCard key={`${video.id}-${index}`} video={video} />
      ))}
      
      {/* Infinite scroll trigger */}
      {hasMore && (
        <div ref={lastElementRef}>
          {loadingMore ? 'Loading...' : 'Scroll for more'}
        </div>
      )}
    </div>
  );
};
```

### Manual Loading

```javascript
const {
  data: videos,
  loading,
  loadingMore,
  hasMore,
  loadMore,
} = useInfiniteVideoScroll({
  perPage: 20,
  enableAutoLoad: false, // Disable auto-loading
});

// Manual load more button
<button onClick={loadMore} disabled={loadingMore}>
  {loadingMore ? 'Loading...' : 'Load More Videos'}
</button>
```

### With Dependencies

```javascript
const {
  data: videos,
  loading,
  loadMore,
} = useInfiniteVideoScroll({
  perPage: 15,
  dependencies: [categoryId, searchTerm], // Resets when these change
});
```

## Hook Options

### `useInfiniteScroll(endpoint, options)`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `endpoint` | string | required | API endpoint to fetch data from |
| `initialPage` | number | 1 | Starting page number |
| `perPage` | number | 15 | Number of items per page |
| `dependencies` | array | [] | Dependencies that trigger reset |
| `enableAutoLoad` | boolean | true | Enable automatic loading on scroll |
| `threshold` | number | 200 | Distance from bottom to trigger load |

### `useInfiniteVideoScroll(options)`

Specialized hook for videos with pre-configured endpoint.

## Response Format Handling

The hook automatically handles different response formats:

### Paginated Response (New Format)
```json
{
  "payload": {
    "data": [...],
    "current_page": 1,
    "last_page": 5,
    "total": 100
  }
}
```

### Regular Array Response (Legacy Format)
```json
{
  "payload": [...]
}
```

## Error Handling

```javascript
const {
  data: videos,
  loading,
  error,
  refresh,
} = useInfiniteVideoScroll();

if (error) {
  return (
    <div>
      <p>Error: {error}</p>
      <button onClick={refresh}>Try Again</button>
    </div>
  );
}
```

## Performance Considerations

### 1. Key Props
Always use unique keys for list items:

```javascript
{videos.map((video, index) => (
  <VideoCard key={`${video.id}-${index}`} video={video} />
))}
```

### 2. Virtual Scrolling
For large lists, consider implementing virtual scrolling:

```javascript
// Example with react-window
import { FixedSizeList as List } from 'react-window';

const VirtualizedVideoList = ({ videos }) => (
  <List
    height={600}
    itemCount={videos.length}
    itemSize={200}
    itemData={videos}
  >
    {VideoItem}
  </List>
);
```

### 3. Memory Management
The hook automatically manages memory by appending new items to existing data. For very large datasets, consider implementing cleanup:

```javascript
const {
  data: videos,
  refresh,
} = useInfiniteVideoScroll({
  perPage: 50, // Larger page size
});

// Refresh to clear memory when needed
useEffect(() => {
  const timer = setInterval(() => {
    refresh();
  }, 300000); // Refresh every 5 minutes

  return () => clearInterval(timer);
}, [refresh]);
```

## Filter Integration

The FilterVideo component now supports pagination:

```javascript
const sendFiltersToAPI = useCallback(async (filters) => {
  const payload = {
    ...filters,
    page: 1,
    per_page: 15,
  };

  const response = await axios.post(
    createApiUrl(API_ENDPOINTS.videos.filter),
    payload
  );
  
  // Handle paginated response
  if (response.data.payload.data) {
    setVideoData(response.data.payload.data);
  } else {
    setVideoData(response.data.payload);
  }
}, []);
```

## Testing

### Unit Tests

```javascript
import { renderHook } from '@testing-library/react-hooks';
import { useInfiniteVideoScroll } from '../hooks/useInfiniteScroll';

test('should load initial data', async () => {
  const { result, waitForNextUpdate } = renderHook(() => 
    useInfiniteVideoScroll({ perPage: 5 })
  );

  await waitForNextUpdate();
  
  expect(result.current.loading).toBe(false);
  expect(result.current.data).toHaveLength(5);
  expect(result.current.hasMore).toBe(true);
});
```

### Integration Tests

```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import VideoList from '../components/VideoList';

test('should load more videos on scroll', async () => {
  render(<VideoList />);
  
  const loadMoreButton = screen.getByText('Load More Videos');
  fireEvent.click(loadMoreButton);
  
  await screen.findByText('Loading...');
  // Assert new videos are loaded
});
```

## Troubleshooting

### Common Issues

1. **Duplicate Keys**
   ```javascript
   // Wrong
   key={index}
   
   // Correct
   key={`${item.id}-${index}`}
   ```

2. **Memory Leaks**
   ```javascript
   // Always clean up in useEffect
   useEffect(() => {
     return () => {
       // Cleanup code
     };
   }, []);
   ```

3. **Infinite Loading**
   ```javascript
   // Check if hasMore is properly set
   console.log('hasMore:', hasMore, 'currentPage:', currentPage, 'totalPages:', totalPages);
   ```

### Debug Mode

Enable debug logging by adding to your component:

```javascript
const {
  data: videos,
  loading,
  error,
  currentPage,
  totalPages,
  hasMore,
} = useInfiniteVideoScroll();

console.log('Pagination Debug:', {
  videosCount: videos.length,
  loading,
  error,
  currentPage,
  totalPages,
  hasMore,
});
```

## Migration from Old System

### Before (Old System)
```javascript
const [videos, setVideos] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchVideos = async () => {
    const response = await axios.get('api/videos');
    setVideos(response.data.payload);
    setLoading(false);
  };
  fetchVideos();
}, []);
```

### After (New System)
```javascript
const {
  data: videos,
  loading,
  loadMore,
  hasMore,
} = useInfiniteVideoScroll();
```

## Best Practices

1. **Always handle loading states**
2. **Provide fallback UI for errors**
3. **Use appropriate page sizes (15-50 items)**
4. **Implement proper key props for list items**
5. **Consider memory usage for large datasets**
6. **Test with slow network connections**
7. **Provide manual load more options for accessibility**

## Examples

See `src/examples/InfiniteScrollExample.jsx` for comprehensive usage examples including:
- Basic infinite scroll
- Manual loading
- Dependent loading
- Custom endpoints
- Error handling

This pagination system provides a smooth, modern user experience while maintaining compatibility with the existing API structure.
