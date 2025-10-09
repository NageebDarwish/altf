/**
 * Extension Error Handler
 * Handles errors caused by browser extensions trying to modify the DOM
 */

// Suppress extension-related errors and third-party library warnings
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;

console.error = function(...args) {
  const message = args[0];
  const messageStr = typeof message === 'string' ? message : String(message);
  
  // Filter out extension-related errors
  if (
    messageStr.includes('install-popup-button') ||
    messageStr.includes('appendChild') ||
    messageStr.includes('Cannot read properties of null') ||
    (args.length > 0 && args[0] instanceof Error && args[0].stack && args[0].stack.includes('install-popup-button'))
  ) {
    return; // Suppress these errors
  }
  
  // Log other errors normally
  originalConsoleError.apply(console, args);
};

console.warn = function(...args) {
  const message = args[0];
  
  // Filter out third-party library warnings
  if (
    typeof message === 'string' &&
    (
      message.includes('UNSAFE_componentWillMount') ||
      message.includes('SideEffect(NullComponent') ||
      message.includes('react-helmet')
    )
  ) {
    return; // Suppress these warnings
  }
  
  // Log other warnings normally
  originalConsoleWarn.apply(console, args);
};

// Add global error handler for uncaught errors
window.addEventListener('error', (event) => {
  const { message, filename, error } = event;
  
  // Suppress extension-related errors
  if (
    (filename && (
      filename.includes('install-popup-button') ||
      filename.includes('extension') ||
      filename.includes('content-script')
    )) ||
    (message && (
      message.includes('appendChild') ||
      message.includes('Cannot read properties of null') ||
      message.includes('install-popup-button')
    )) ||
    (error && error.stack && error.stack.includes('install-popup-button'))
  ) {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    return false;
  }
}, true); // Use capture phase to catch errors earlier

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
