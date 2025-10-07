import axios from "axios";
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from "./actionTypes";
import { API_URL, API_ENDPOINTS } from "../../config/api";

// Action Types Constants for OTP and other actions
export const OTP_ACTIONS = {
  REQUEST: "OTP_REQUEST",
  SUCCESS: "OTP_SUCCESS",
  FAILURE: "OTP_FAILURE",
  RESEND_REQUEST: "RESEND_OTP",
  RESEND_SUCCESS: "OTP_SUCCESSS", // Note: keeping original typo for compatibility
  RESEND_FAILURE: "OTP_FAILUREE", // Note: keeping original typo for compatibility
};

export const USER_ACTIONS = {
  UPDATE_NAME: "UPDATE_USER_NAME",
  UPDATE_DATA: "UPDATE_USER_DATA",
  UPDATE_PROFILE: "UPDATE_USER_PROFILE",
  MARK_BADGE_SEEN: "MARK_BADGE_AS_SEEN",
  LOAD_SEEN_BADGES: "LOAD_SEEN_BADGES",
};

export const PAYMENT_ACTIONS = {
  SAVE_CARD_DETAILS: "SAVE_CARD_DETAILS",
};

/**
 * Utility function to extract error messages from API responses
 * @param {Object} error - The error object from axios
 * @param {string} defaultMessage - Default message if no specific error found
 * @returns {string} - Formatted error message
 */
const extractErrorMessage = (
  error,
  defaultMessage = "An error occurred. Please try again."
) => {
  if (!error?.response?.data) {
    return error?.message || defaultMessage;
  }

  const { data } = error.response;

  // Handle different error response structures
  if (data.payload) {
    return (
      data.payload.email ||
      data.payload.password ||
      data.payload.message ||
      defaultMessage
    );
  }

  if (data.data) {
    return (
      data.data.email ||
      data.data.password ||
      data.data.message ||
      defaultMessage
    );
  }
  return data.message || data.error || defaultMessage;
};

/**
 * Utility function to handle API requests with consistent error handling
 * @param {Function} dispatch - Redux dispatch function
 * @param {Object} config - Request configuration
 * @returns {Promise} - API response
 */
const handleApiRequest = async (dispatch, config) => {
  const {
    url,
    data,
    method = "POST",
    requestAction,
    successAction,
    failureAction,
    successCallback,
    errorMessage = "Request failed",
  } = config;

  dispatch({ type: requestAction });

  try {
    const response = await axios({
      method,
      url: `${API_URL}${url}`,
      data,
    });

    dispatch({
      type: successAction,
      payload: response.data,
    });

    // Execute success callback if provided
    if (successCallback) {
      successCallback(response);
    }

    return response;
  } catch (error) {
    const errorMsg = extractErrorMessage(error, errorMessage);

    dispatch({
      type: failureAction,
      payload: error.response?.data || errorMsg,
    });

    // Create a new error with the extracted message for better error handling
    const enhancedError = new Error(errorMsg);
    enhancedError.originalError = error;
    enhancedError.response = error.response;

    throw enhancedError;
  }
};

/**
 * Register a new user
 * @param {Object} userData - User registration data
 * @returns {Function} - Redux thunk function
 */
export const registerUser = (userData) => {
  return async (dispatch) => {
    // Input validation
    if (!userData?.email || !userData?.password || !userData?.fullname) {
      throw new Error("All fields are required for registration");
    }

    return handleApiRequest(dispatch, {
      url: "register",
      data: userData,
      requestAction: REGISTER_REQUEST,
      successAction: REGISTER_SUCCESS,
      failureAction: REGISTER_FAILURE,
      errorMessage: "Registration failed. Please try again.",
      successCallback: (response) => {
        // Store token in localStorage on successful registration
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
        }
      },
    });
  };
};

/**
 * Login user
 * @param {Object} userData - User login credentials
 * @returns {Function} - Redux thunk function
 */
export const loginUser = (userData) => {
  return async (dispatch) => {
    // Input validation
    if (!userData?.email || !userData?.password) {
      throw new Error("Email and password are required");
    }

    return handleApiRequest(dispatch, {
      url: "login",
      data: userData,
      requestAction: LOGIN_REQUEST,
      successAction: LOGIN_SUCCESS,
      failureAction: LOGIN_FAILURE,
      errorMessage: "Login failed. Please check your credentials.",
      successCallback: (response) => {
        // Store token in localStorage on successful login
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
        }
      },
    });
  };
};

/**
 * Verify OTP
 * @param {Object} otpData - OTP verification data
 * @returns {Function} - Redux thunk function
 */
export const verifyOtp = (otpData) => {
  return async (dispatch) => {
    // Input validation
    if (!otpData?.otp) {
      throw new Error("OTP is required for verification");
    }

    return handleApiRequest(dispatch, {
      url: "verifyOtp",
      data: otpData,
      requestAction: OTP_ACTIONS.REQUEST,
      successAction: OTP_ACTIONS.SUCCESS,
      failureAction: OTP_ACTIONS.FAILURE,
      errorMessage: "OTP verification failed. Please try again.",
    });
  };
};

/**
 * Resend OTP
 * @param {Object} resendData - Data for OTP resend
 * @returns {Function} - Redux thunk function
 */
export const resendOtp = (resendData) => {
  return async (dispatch) => {
    // Input validation
    if (!resendData?.email) {
      throw new Error("Email is required to resend OTP");
    }

    return handleApiRequest(dispatch, {
      url: "resendOtp",
      data: resendData,
      requestAction: OTP_ACTIONS.RESEND_REQUEST,
      successAction: OTP_ACTIONS.RESEND_SUCCESS,
      failureAction: OTP_ACTIONS.RESEND_FAILURE,
      errorMessage: "Failed to resend OTP. Please try again.",
    });
  };
};

// User Management Actions

/**
 * Update user name
 * @param {string} newName - New user name
 * @returns {Object} - Redux action
 */
export const updateUserName = (newName) => {
  if (!newName || typeof newName !== "string") {
    throw new Error("Valid name is required");
  }

  return {
    type: USER_ACTIONS.UPDATE_NAME,
    payload: newName.trim(),
  };
};

/**
 * Mark badge as seen
 * @param {string|number} badgeId - Badge identifier
 * @returns {Object} - Redux action
 */
export const markBadgeAsSeen = (badgeId) => {
  if (!badgeId) {
    throw new Error("Badge ID is required");
  }

  return {
    type: USER_ACTIONS.MARK_BADGE_SEEN,
    payload: badgeId,
  };
};

/**
 * Load seen badges for user
 * @param {string|number} userId - User identifier
 * @returns {Object} - Redux action
 */
export const loadSeenBadges = (userId) => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  return {
    type: USER_ACTIONS.LOAD_SEEN_BADGES,
    payload: { userId },
  };
};

/**
 * Update user data
 * @param {Object} userData - User data to update
 * @returns {Object} - Redux action
 */
export const updateUserData = (userData) => {
  if (!userData || typeof userData !== "object") {
    throw new Error("Valid user data object is required");
  }

  return {
    type: USER_ACTIONS.UPDATE_DATA,
    payload: userData,
  };
};

/**
 * Update user profile
 * @param {Object} updatedData - Updated profile data
 * @returns {Object} - Redux action
 */
export const updateUserProfile = (updatedData) => {
  if (!updatedData || typeof updatedData !== "object") {
    throw new Error("Valid profile data object is required");
  }

  return {
    type: USER_ACTIONS.UPDATE_PROFILE,
    payload: updatedData,
  };
};

// Payment Actions

/**
 * Save card details
 * @param {Object} cardDetails - Card details object
 * @returns {Object} - Redux action
 */
export const saveCardDetails = (cardDetails) => {
  // Validate card details structure
  if (!cardDetails || typeof cardDetails !== "object") {
    throw new Error("Valid card details object is required");
  }

  const { card_number, cvv, expiry_date } = cardDetails;

  if (!card_number || !cvv || !expiry_date) {
    throw new Error("Card number, CVV, and expiry date are required");
  }

  return {
    type: PAYMENT_ACTIONS.SAVE_CARD_DETAILS,
    payload: {
      card_number: card_number.toString(),
      cvv: cvv.toString(),
      expiry_date: expiry_date.toString(),
    },
  };
};
