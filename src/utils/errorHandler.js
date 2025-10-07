/**
 * Centralized Error Handling Utilities
 * Provides consistent error handling patterns across the application
 */

/**
 * Error types for consistent error categorization
 */
export const ERROR_TYPES = {
  NETWORK: 'NETWORK_ERROR',
  VALIDATION: 'VALIDATION_ERROR',
  AUTHENTICATION: 'AUTHENTICATION_ERROR',
  AUTHORIZATION: 'AUTHORIZATION_ERROR',
  NOT_FOUND: 'NOT_FOUND_ERROR',
  SERVER: 'SERVER_ERROR',
  UNKNOWN: 'UNKNOWN_ERROR'
};

/**
 * Error severity levels
 */
export const ERROR_SEVERITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical'
};

/**
 * Extracts error message from various error response formats
 * @param {Object} error - The error object
 * @param {string} defaultMessage - Default message if no specific error found
 * @returns {string} - Formatted error message
 */
export const extractErrorMessage = (error, defaultMessage = "An error occurred. Please try again.") => {
  if (!error) return defaultMessage;

  // Handle network errors
  if (!error.response) {
    return error.message || "Network error. Please check your connection.";
  }

  const { data } = error.response;

  // Handle different error response structures
  if (data?.payload) {
    return (
      data.payload.email ||
      data.payload.password ||
      data.payload.message ||
      data.payload.error ||
      defaultMessage
    );
  }

  if (data?.data) {
    return (
      data.data.email ||
      data.data.password ||
      data.data.message ||
      data.data.error ||
      defaultMessage
    );
  }

  return data?.message || data?.error || error.message || defaultMessage;
};

/**
 * Determines error type based on HTTP status code
 * @param {number} status - HTTP status code
 * @returns {string} - Error type
 */
export const getErrorType = (status) => {
  switch (status) {
    case 400:
      return ERROR_TYPES.VALIDATION;
    case 401:
      return ERROR_TYPES.AUTHENTICATION;
    case 403:
      return ERROR_TYPES.AUTHORIZATION;
    case 404:
      return ERROR_TYPES.NOT_FOUND;
    case 500:
    case 502:
    case 503:
      return ERROR_TYPES.SERVER;
    default:
      return ERROR_TYPES.UNKNOWN;
  }
};

/**
 * Determines error severity based on error type and context
 * @param {string} errorType - Type of error
 * @param {Object} context - Additional context
 * @returns {string} - Error severity
 */
export const getErrorSeverity = (errorType, context = {}) => {
  switch (errorType) {
    case ERROR_TYPES.AUTHENTICATION:
    case ERROR_TYPES.AUTHORIZATION:
      return ERROR_SEVERITY.HIGH;
    case ERROR_TYPES.SERVER:
      return ERROR_SEVERITY.CRITICAL;
    case ERROR_TYPES.VALIDATION:
      return ERROR_SEVERITY.MEDIUM;
    case ERROR_TYPES.NETWORK:
      return ERROR_SEVERITY.MEDIUM;
    default:
      return ERROR_SEVERITY.LOW;
  }
};

/**
 * Creates a standardized error object
 * @param {Object} error - Original error
 * @param {Object} context - Additional context
 * @returns {Object} - Standardized error object
 */
export const createStandardError = (error, context = {}) => {
  const status = error?.response?.status;
  const errorType = getErrorType(status);
  const severity = getErrorSeverity(errorType, context);
  const message = extractErrorMessage(error);

  return {
    type: errorType,
    severity,
    message,
    status,
    originalError: error,
    context,
    timestamp: new Date().toISOString()
  };
};

/**
 * Handles API errors with consistent logging and user feedback
 * @param {Object} error - The error object
 * @param {Object} options - Handling options
 * @returns {Object} - Standardized error
 */
export const handleApiError = (error, options = {}) => {
  const {
    showToast = true,
    logError = true,
    context = {},
    defaultMessage = "An error occurred. Please try again."
  } = options;

  const standardError = createStandardError(error, context);

  // Log error for debugging
  if (logError && process.env.NODE_ENV === 'development') {
    console.error('API Error:', standardError);
  }

  // Show user-friendly message
  if (showToast) {
    // Import toast dynamically to avoid circular dependencies
    import('../components/toast/ToastComp').then(({ default: ToastComp }) => {
      ToastComp({
        variant: "error",
        message: standardError.message
      });
    });
  }

  return standardError;
};

/**
 * Handles form validation errors
 * @param {Object} error - Validation error
 * @returns {Object} - Formatted validation errors
 */
export const handleValidationError = (error) => {
  const message = extractErrorMessage(error, "Please check your input and try again.");
  
  return {
    type: ERROR_TYPES.VALIDATION,
    message,
    fields: error?.response?.data?.payload || {},
    timestamp: new Date().toISOString()
  };
};

/**
 * Retry mechanism for failed requests
 * @param {Function} requestFn - Function to retry
 * @param {number} maxRetries - Maximum number of retries
 * @param {number} delay - Delay between retries in ms
 * @returns {Promise} - Promise that resolves with result or rejects with final error
 */
export const retryRequest = async (requestFn, maxRetries = 3, delay = 1000) => {
  let lastError;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await requestFn();
    } catch (error) {
      lastError = error;
      
      // Don't retry on certain error types
      const errorType = getErrorType(error?.response?.status);
      if ([ERROR_TYPES.AUTHENTICATION, ERROR_TYPES.AUTHORIZATION, ERROR_TYPES.VALIDATION].includes(errorType)) {
        throw error;
      }
      
      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, delay * attempt));
      }
    }
  }
  
  throw lastError;
};
