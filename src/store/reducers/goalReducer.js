const initialState = {
  completed_minutes: 0,
  target_minutes: 0,
  streaks: [],
  count: 0,
};

const goalReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_GOAL":
      return {
        ...state,
        completed_minutes: action.payload.completed_minutes,
        target_minutes: action.payload.target_minutes,
      };

    case "LOGOUT":
      return {
        ...initialState // reset to initial values
      };

    default:
      return state;
  }
};

export default goalReducer;
