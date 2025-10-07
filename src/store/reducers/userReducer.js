const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  seenBadges: []
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
   case "ADD_USER": {
      const userId = action.payload.user?.id;
      // Load this user's seen badges from localStorage
      const seenBadges = userId 
        ? JSON.parse(localStorage.getItem(`user_${userId}_seenBadges`)) || []
        : [];
      
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        seenBadges: seenBadges // User-specific badges
      };
    }

    case "UPDATE_USER_NAME": {
      return {
        ...state,
        user: {
          ...state.user,
          name: action.payload,
        },
      };
    }

    case "UPDATE_USER_PROFILE":
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload, // Update user fields like name or profile_image
        },
      };

    case "LOGOUT": {
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
       
      };
    }

    // In your user reducer
case 'ADD_TO_FAVORITES':
  return {
    ...state,
    user: {
      ...state.user,
      video_lists: [...state.user.video_lists, action.payload]
    }
  };

case 'REMOVE_FROM_FAVORITES':
  return {
    ...state,
    user: {
      ...state.user,
      video_lists: state.user.video_lists.filter(
        item => item.video_id !== action.payload
      )
    }
  };

    // In your user reducer
case 'UPDATE_USER_DATA':
  return {
    ...state,
    user: {
      ...state.user,
      ...action.payload
    }
  };
    case 'MARK_BADGE_AS_SEEN': {
      const userId = state.user?.id;
      const badgeId = action.payload;
      
      if (!userId || state.seenBadges.includes(badgeId)) {
        return state;
      }

      // Update both localStorage and Redux state
      const newSeenBadges = [...state.seenBadges, badgeId];
      localStorage.setItem(`user_${userId}_seenBadges`, JSON.stringify(newSeenBadges));

      return {
        ...state,
        seenBadges: newSeenBadges
      };
    }
    default:
      return state;
  }
};

export default userReducer;
