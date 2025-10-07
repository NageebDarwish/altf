/**
 * API Helper Functions
 * Utility functions to simplify API calls using the centralized configuration
 */

import axios from 'axios';
import { createApiUrl, API_ENDPOINTS, API_CONFIG } from '../config/api';

/**
 * Generic API request function
 * @param {string} endpoint - API endpoint
 * @param {Object} options - Request options
 * @returns {Promise} - API response
 */
export const apiRequest = async (endpoint, options = {}) => {
  const {
    method = 'GET',
    data = null,
    params = {},
    headers = {},
    timeout = API_CONFIG.timeout,
  } = options;

  const config = {
    method,
    url: endpoint.startsWith('http') ? endpoint : createApiUrl(endpoint),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...headers,
    },
    timeout,
  };

  if (data) {
    config.data = data;
  }

  if (Object.keys(params).length > 0) {
    config.params = params;
  }

  // Add authentication token if available
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

/**
 * GET request helper
 * @param {string} endpoint - API endpoint
 * @param {Object} params - Query parameters
 * @param {Object} headers - Additional headers
 * @returns {Promise} - API response
 */
export const apiGet = (endpoint, params = {}, headers = {}) => {
  return apiRequest(endpoint, { method: 'GET', params, headers });
};

/**
 * POST request helper
 * @param {string} endpoint - API endpoint
 * @param {Object} data - Request data
 * @param {Object} headers - Additional headers
 * @returns {Promise} - API response
 */
export const apiPost = (endpoint, data = {}, headers = {}) => {
  return apiRequest(endpoint, { method: 'POST', data, headers });
};

/**
 * PUT request helper
 * @param {string} endpoint - API endpoint
 * @param {Object} data - Request data
 * @param {Object} headers - Additional headers
 * @returns {Promise} - API response
 */
export const apiPut = (endpoint, data = {}, headers = {}) => {
  return apiRequest(endpoint, { method: 'PUT', data, headers });
};

/**
 * DELETE request helper
 * @param {string} endpoint - API endpoint
 * @param {Object} headers - Additional headers
 * @returns {Promise} - API response
 */
export const apiDelete = (endpoint, headers = {}) => {
  return apiRequest(endpoint, { method: 'DELETE', headers });
};

/**
 * PATCH request helper
 * @param {string} endpoint - API endpoint
 * @param {Object} data - Request data
 * @param {Object} headers - Additional headers
 * @returns {Promise} - API response
 */
export const apiPatch = (endpoint, data = {}, headers = {}) => {
  return apiRequest(endpoint, { method: 'PATCH', data, headers });
};

/**
 * File upload helper
 * @param {string} endpoint - API endpoint
 * @param {FormData} formData - Form data to upload
 * @param {Object} headers - Additional headers
 * @returns {Promise} - API response
 */
export const apiUpload = (endpoint, formData, headers = {}) => {
  return apiRequest(endpoint, {
    method: 'POST',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
      ...headers,
    },
  });
};

/**
 * Video API helpers
 */
export const videoApi = {
  // Get video list with filters
  getList: (filters = {}) => apiPost(API_ENDPOINTS.videos.filter, filters),
  
  // Get paginated video list
  getPaginatedList: (page = 1, perPage = 15, filters = {}) => 
    apiGet(API_ENDPOINTS.videos.getPaginated(page, perPage), filters),
  
  // Search videos
  search: (query) => apiPost(API_ENDPOINTS.search.videos, { title: query }),
  
  // Get video details
  getDetails: (id) => apiGet(API_ENDPOINTS.videos.getById(id)),
  
  // Mark video as watched
  markWatched: (id, progress = 0) => 
    apiPost(API_ENDPOINTS.videos.markWatched(id), { progress }),
  
  // Add/remove from list
  addToList: (id) => apiPost(API_ENDPOINTS.videos.addToList, { video_id: id }),
  removeFromList: (id) => apiPost(API_ENDPOINTS.videos.removeFromList, { video_id: id }),
  
  // Get user's video list with pagination
  getUserList: (page = 1, perPage = 15) => 
    apiGet(`${API_ENDPOINTS.videos.getUserList}?page=${page}&per_page=${perPage}`),
    
  // Get user's video history with pagination
  getUserHistory: (page = 1, perPage = 15) => 
    apiGet(`${API_ENDPOINTS.videos.getUserHistory}?page=${page}&per_page=${perPage}`),
};

/**
 * Series API helpers
 */
export const seriesApi = {
  // Get series list
  getList: () => apiGet(API_ENDPOINTS.series.list),
  
  // Get series details
  getDetails: (id) => apiGet(API_ENDPOINTS.series.getById(id)),
  
  // Get series videos
  getVideos: (id) => apiGet(API_ENDPOINTS.series.getVideosBySeries(id)),
  
  // Mark series video as watched
  markWatched: (id, progress = 0) => 
    apiPost(API_ENDPOINTS.series.watched(id), { progress }),
};

/**
 * User API helpers
 */
export const userApi = {
  // Get user profile
  getProfile: () => apiGet(API_ENDPOINTS.user.profile),
  
  // Update user profile
  updateProfile: (data) => apiPost(API_ENDPOINTS.user.updateProfile, data),
  
  // Change password
  changePassword: (data) => apiPost(API_ENDPOINTS.user.changePassword, data),
  
  // Edit profile
  editProfile: (data) => apiPost(API_ENDPOINTS.user.editProfile, data),
};

/**
 * Goals API helpers
 */
export const goalsApi = {
  // Get goals
  getList: () => apiGet(API_ENDPOINTS.goals.list),
  
  // Create goal
  create: (data) => apiPost(API_ENDPOINTS.goals.create, data),
  
  // Update goal
  update: (data) => apiPost(API_ENDPOINTS.goals.update, data),
  
  // Delete goal
  delete: (id) => apiDelete(API_ENDPOINTS.goals.getById(id)),
};

/**
 * Timeline API helpers
 */
export const timelineApi = {
  // Update video timeline
  updateVideo: (data) => apiPost(API_ENDPOINTS.timeline.video, data),
  
  // Update series timeline
  updateSeries: (data) => apiPost(API_ENDPOINTS.timeline.series, data),
  
  // Get progress
  getProgress: () => apiGet(API_ENDPOINTS.timeline.progress),
};

/**
 * Filter API helpers
 */
export const filterApi = {
  // Get suggestions
  getSuggestions: () => apiGet(API_ENDPOINTS.filters.suggestions),
  
  // Get levels
  getLevels: () => apiGet(API_ENDPOINTS.filters.levels),
  
  // Get guides
  getGuides: () => apiGet(API_ENDPOINTS.filters.guides),
  
  // Get topics
  getTopics: () => apiGet(API_ENDPOINTS.filters.topics),
  
  // Get custom filter data
  getCustomData: (apiKey) => apiGet(API_ENDPOINTS.filters.custom(apiKey)),
};

/**
 * Settings API helpers
 */
export const settingsApi = {
  // Get app settings
  getSettings: () => apiGet(API_ENDPOINTS.settings.app),
  
  // Get plans
  getPlans: () => apiGet(API_ENDPOINTS.settings.plans),
  
  // Get pricing
  getPricing: () => apiGet(API_ENDPOINTS.settings.pricing),
};

export default {
  apiRequest,
  apiGet,
  apiPost,
  apiPut,
  apiDelete,
  apiPatch,
  apiUpload,
  videoApi,
  seriesApi,
  userApi,
  goalsApi,
  timelineApi,
  filterApi,
  settingsApi,
};
