// redux/reducer.js

import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  OTP_SUCCESS,
  OTP_REQUEST,
  LOGOUT_SUCCESS
} from "./actionTypes";

const initialState = {
  loading: false,
  user: null,
  token: null,
  error: null,
  isAuthenticated : false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
    case OTP_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case REGISTER_SUCCESS:
    case OTP_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user, 
        token: action.payload.token, 
        error: null,
        
      };
      case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user, 
        token: action.payload.token, 
        isAuthenticated:true,
        error: null,
        
      };
      case LOGOUT_SUCCESS:
      return {
        ...state,
        // loading: false,
        user: null, 
        token: null, 
        isAuthenticated:false,
        
      };

    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default authReducer;
