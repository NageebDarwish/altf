/**
 * Extension Error Handler
 * Handles errors caused by browser extensions trying to modify the DOM
 */

// Suppress extension-related errors
const originalConsoleError = console.error;
console.error = function(...args) {
  const message = args[0];
  
  // Filter out extension-related errors
  if (
    typeof message === 'string' &&
    (
      message.includes('install-popup-button') ||
      message.includes('appendChild') ||
      message.includes('Cannot read properties of null')
    )
  ) {
    return; // Suppress these errors
  }
  
  // Log other errors normally
  originalConsoleError.apply(console, args);
};

// Add global error handler for uncaught errors
window.addEventListener('error', (event) => {
  const { message, filename, lineno } = event;
  
  // Suppress extension-related errors
  if (
    filename && (
      filename.includes('install-popup-button') ||
      filename.includes('extension') ||
      filename.includes('content-script')
    ) ||
    message.includes('appendChild') ||
    message.includes('Cannot read properties of null')
  ) {
    event.preventDefault();
    event.stopPropagation();
    return false;
  }
});

// Add unhandled promise rejection handler
window.addEventListener('unhandledrejection', (event) => {
  const { reason } = event;
  
  if (
    reason && 
    typeof reason === 'object' && 
    reason.message && (
      reason.message.includes('appendChild') ||
      reason.message.includes('Cannot read properties of null')
    )
  ) {
    event.preventDefault();
    return false;
  }
});

export default {
  suppressExtensionErrors: true,
};
