# Centralized API Configuration

This directory contains the centralized API configuration for the Arabic All The Times frontend application. All API endpoints and configurations are managed from a single place to ensure consistency and ease of maintenance.

## Files

- `api.js` - Main API configuration file containing all endpoints and configuration
- `README.md` - This documentation file

## Quick Start

### Basic Usage

```javascript
import { createApiUrl, API_ENDPOINTS } from '../config/api';

// Create a full API URL
const url = createApiUrl(API_ENDPOINTS.videos.list);

// Use with axios
const response = await axios.get(url);
```

### Using Helper Functions

```javascript
import { apiGet, apiPost, videoApi } from '../utils/apiHelpers';

// Simple GET request
const videos = await apiGet(API_ENDPOINTS.videos.list);

// POST request with data
const result = await apiPost(API_ENDPOINTS.videos.addToList, { video_id: 123 });

// Using specialized helpers
const videoList = await videoApi.getList({ topics: ['grammar'] });
```

## Configuration Structure

### Environment Configuration

The API configuration automatically detects the environment and uses appropriate URLs:

- **Development**: `http://localhost:3000/`
- **Production**: `https://admin.arabicallthetime.com/`
- **Staging**: `https://staging.arabicallthetime.com/`

Environment variables override default configurations:
- `VITE_REACT_APP_URL` - Base URL for the application
- `VITE_APP_ENV` - Environment name (development, production, staging)
- `VITE_API_TIMEOUT` - Request timeout in milliseconds
- `VITE_API_RETRY_ATTEMPTS` - Number of retry attempts

### API Endpoints

All endpoints are organized by feature:

```javascript
export const API_ENDPOINTS = {
  // Authentication
  auth: {
    login: 'auth/login',
    register: 'auth/register',
    // ... more auth endpoints
  },

  // Video Management
  videos: {
    list: 'videos',
    search: 'video_search',
    filter: 'video_filter',
    // ... more video endpoints
  },

  // Series Management
  series: {
    list: 'series/list',
    details: 'series',
    // ... more series endpoints
  },

  // ... other feature groups
};
```

## Migration Guide

### Before (Old Way)

```javascript
// Hardcoded URLs scattered throughout the codebase
const response = await axios.get(`${import.meta.env.VITE_REACT_APP_URL}api/videos`);
const searchResult = await axios.post(`${import.meta.env.VITE_REACT_APP_URL}api/video_search`, data);
```

### After (New Way)

```javascript
// Centralized configuration
import { createApiUrl, API_ENDPOINTS } from '../config/api';

const response = await axios.get(createApiUrl(API_ENDPOINTS.videos.list));
const searchResult = await axios.post(createApiUrl(API_ENDPOINTS.videos.search), data);
```

## Advanced Usage

### Custom API Calls

```javascript
import { apiRequest } from '../utils/apiHelpers';

// Custom request with specific options
const response = await apiRequest('custom/endpoint', {
  method: 'PUT',
  data: { key: 'value' },
  headers: { 'Custom-Header': 'value' },
  timeout: 5000
});
```

### File Uploads

```javascript
import { apiUpload } from '../utils/apiHelpers';

const formData = new FormData();
formData.append('file', file);

const response = await apiUpload('upload/endpoint', formData);
```

### Dynamic Endpoints

```javascript
import { createApiUrl, API_ENDPOINTS } from '../config/api';

// Endpoints with parameters
const videoUrl = createApiUrl(API_ENDPOINTS.videos.getById(123));
const topicUrl = createApiUrl(API_ENDPOINTS.videos.getByTopic('grammar'));
```

## Benefits

1. **Single Source of Truth**: All API endpoints defined in one place
2. **Environment Management**: Easy switching between development, staging, and production
3. **Type Safety**: Consistent endpoint names reduce typos
4. **Maintainability**: Changes to API structure only require updates in one file
5. **Testing**: Easier to mock and test API calls
6. **Documentation**: Self-documenting API structure

## Best Practices

1. **Always use the centralized configuration** instead of hardcoded URLs
2. **Use helper functions** for common operations (apiGet, apiPost, etc.)
3. **Organize endpoints by feature** to maintain clarity
4. **Use environment variables** for configuration overrides
5. **Add new endpoints** to the appropriate feature group in `api.js`

## Adding New Endpoints

To add a new endpoint:

1. Add it to the appropriate feature group in `API_ENDPOINTS`
2. Create helper functions in `apiHelpers.js` if needed
3. Update this documentation

Example:

```javascript
// In api.js
export const API_ENDPOINTS = {
  videos: {
    // ... existing endpoints
    comments: 'videos/comments',
    getComments: (id) => `videos/${id}/comments`,
  }
};

// In apiHelpers.js
export const videoApi = {
  // ... existing helpers
  getComments: (id) => apiGet(API_ENDPOINTS.videos.getComments(id)),
  addComment: (id, data) => apiPost(API_ENDPOINTS.videos.comments, { video_id: id, ...data }),
};
```

## Troubleshooting

### Common Issues

1. **Import Errors**: Make sure the path to `api.js` is correct relative to your component
2. **Environment Variables**: Check that `VITE_REACT_APP_URL` is set correctly
3. **Endpoint Not Found**: Verify the endpoint exists in `API_ENDPOINTS`

### Debug Mode

Enable debug logging by setting `VITE_API_DEBUG=true` in your environment variables.

## Support

For questions or issues with the API configuration, please refer to the development team or create an issue in the project repository.
