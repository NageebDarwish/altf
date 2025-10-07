/**
 * Centralized API Configuration
 * All API endpoints and configurations are managed from this single file
 */

// Environment-based configuration
const ENV = {
  development: {
    baseURL: 'http://127.0.0.1:8000/',
    apiURL: 'http://127.0.0.1:8000/api/',
    adminURL: 'http://127.0.0.1:8000/admin/',
  },
  production: {
    baseURL: 'https://admin.arabicallthetime.com/',
    apiURL: 'https://admin.arabicallthetime.com/api/',
    adminURL: 'https://admin.arabicallthetime.com/admin/',
  },
  staging: {
    baseURL: 'https://staging.arabicallthetime.com/',
    apiURL: 'https://staging.arabicallthetime.com/api/',
    adminURL: 'https://staging.arabicallthetime.com/admin/',
  }
};

// Get current environment or default to production
const getEnvironment = () => {
  const envVar = import.meta.env.VITE_APP_ENV || import.meta.env.MODE;
  return ENV[envVar] || ENV.production;
};

// Current configuration
const config = getEnvironment();

// Override with environment variables if they exist
const API_CONFIG = {
  baseURL: import.meta.env.VITE_REACT_APP_URL || config.baseURL,
  apiURL: `${import.meta.env.VITE_REACT_APP_URL || config.baseURL}api/`,
  adminURL: `${import.meta.env.VITE_REACT_APP_URL || config.baseURL}admin/`,
  timeout: import.meta.env.VITE_API_TIMEOUT || 30000,
  retryAttempts: import.meta.env.VITE_API_RETRY_ATTEMPTS || 3,
};

// API Endpoints Configuration
export const API_ENDPOINTS = {
  // Authentication
  auth: {
    login: 'auth/login',
    register: 'auth/register',
    logout: 'auth/logout',
    refreshToken: 'auth/refresh',
    forgotPassword: 'auth/forgot-password',
    resetPassword: 'auth/reset-password',
    verifyEmail: 'auth/verify-email',
    resendOtp: 'auth/resend-otp',
  },

  // User Management
  user: {
    profile: 'user/profile',
    updateProfile: 'user/profile',
    changePassword: 'change/password',
    editProfile: 'edit/profile',
    preferences: 'user/preferences',
    settings: 'user/settings',
  },

  // Video Management
  videos: {
    list: 'videos',
    details: 'videos',
    search: 'video_search',
    filter: 'video_filter',
    watched: 'video/watched',
    addToList: 'video/list',
    removeFromList: 'remove/video/list',
    markWatched: 'video/watched',
    getById: (id) => `videos/${id}`,
    getByTopic: (topic) => `videos?topic=${topic}`,
    getPaginated: (page = 1, perPage = 15) => `videos?page=${page}&per_page=${perPage}`,
    getUserList: 'video/list',
    getUserHistory: 'video/history',
  },

  // Series Management
  series: {
    list: 'series/list',
    details: 'series',
    videos: 'series/videos',
    watched: 'series/video/watched',
    getById: (id) => `series/${id}`,
    getVideosBySeries: (id) => `series/${id}/videos`,
  },

  // Goals and Progress
  goals: {
    list: 'goals',
    create: 'goal',
    update: 'goal',
    delete: 'goal',
    getById: (id) => `goals/${id}`,
  },

  // Timeline
  timeline: {
    video: 'timeline/video',
    series: 'timeline/series',
    progress: 'timeline/progress',
  },

  // Content Management
  content: {
    suggestions: 'suggestions',
    levels: 'levels',
    guides: 'guides',
    topics: 'topics',
    blogs: 'blogs',
    blogDetail: (slug) => `get/blog/${slug}`,
  },

  // Settings and Configuration
  settings: {
    app: 'settings',
    plans: 'plans',
    pricing: 'pricing',
    features: 'features',
  },

  // Subscription and Payments
  subscription: {
    plans: 'plans',
    subscribe: 'subscribe',
    cancel: 'cancel',
    status: 'subscription/status',
  },

  // Search and Filters
  search: {
    videos: 'video_search',
    series: 'series_search',
    global: 'search',
  },

  filters: {
    levels: 'levels',
    topics: 'topics',
    guides: 'guides',
    suggestions: 'suggestions',
    custom: (apiKey) => apiKey,
  },
};

// API Helper Functions
export const createApiUrl = (endpoint, params = {}) => {
  let url = `${API_CONFIG.apiURL}${endpoint}`;
  
  // Replace URL parameters
  Object.keys(params).forEach(key => {
    url = url.replace(`{${key}}`, params[key]);
  });
  
  return url;
};

export const createAdminApiUrl = (endpoint, params = {}) => {
  let url = `${API_CONFIG.adminURL}${endpoint}`;
  
  // Replace URL parameters
  Object.keys(params).forEach(key => {
    url = url.replace(`{${key}}`, params[key]);
  });
  
  return url;
};

// Request Configuration
export const REQUEST_CONFIG = {
  timeout: API_CONFIG.timeout,
  retryAttempts: API_CONFIG.retryAttempts,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
};

// Export the main configuration
export default {
  ...API_CONFIG,
  endpoints: API_ENDPOINTS,
  createUrl: createApiUrl,
  createAdminUrl: createAdminApiUrl,
  requestConfig: REQUEST_CONFIG,
};

// Legacy support - maintain backward compatibility
export const API_URL = API_CONFIG.apiURL;
export const BASE_URL = API_CONFIG.baseURL;
