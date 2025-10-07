import { PAYMENT_ACTIONS } from './action';

/**
 * Initial state for card reducer
 */
const initialState = {
  cardDetails: {
    card_number: "",
    cvv: "",
    expiry_date: "",
  },
  isLoading: false,
  error: null,
};

/**
 * Card reducer to handle payment card related state
 * @param {Object} state - Current state
 * @param {Object} action - Redux action
 * @returns {Object} - New state
 */
const cardReducer = (state = initialState, action) => {
  switch (action.type) {
    case PAYMENT_ACTIONS.SAVE_CARD_DETAILS:
      return {
        ...state,
        cardDetails: action.payload,
        error: null,
      };
    
    case 'CLEAR_CARD_DETAILS':
      return {
        ...state,
        cardDetails: {
          card_number: "",
          cvv: "",
          expiry_date: "",
        },
        error: null,
      };
    
    case 'SET_CARD_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    
    default:
      return state;
  }
};

export default cardReducer;