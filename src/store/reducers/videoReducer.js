const initialState = {
  video_timeline:null,
  video_data: null,
  //daniyal code
  totalWatchTime: 0,
  currentDate: new Date().toISOString().split("T")[0], // Set current date in 'YYYY-MM-DD' format
};

const videoReducer = (state = initialState, action) => {
  switch (action.type) {
    // case "ADD_VIDEO_DATA": {
    //   const { watched_time, video_id } = action.payload;
    //   const existingVideoIndex = state.video_data.findIndex(
    //     (video) => video.video_id === video_id
    //   );

    //   if (existingVideoIndex !== -1) {
    //     const updatedVideos = [...state.video_data];
    //     updatedVideos[existingVideoIndex] = {
    //       ...updatedVideos[existingVideoIndex],
    //       watched_time,
    //     };

    //     return {
    //       ...state,
    //       video_data: updatedVideos,
    //     };
    //   } else {
    //     return {
    //       ...state,
    //       video_data: [...state.video_data, { watched_time, video_id }],
    //     };
    //   }
    // }
    case "ADD_VIDEO_DATA": {
      return {
        ...state,
        video_timeline: action.payload
      };
    }
    case "ADD_VIDEO_WATCH_TIME": {
      return {
        ...state,
        video_data: action.payload
      };
    }
    case "RESET_VIDEO_DATA": {
      return {
        ...state,
        video_data: [],
        video_timeline:[]
        
      };
    }
    //daniyal code
    // case "ADD_VIDEO_WATCH_TIME": {
    //   const { watched_time, video_id } = action.payload;
    //   const existingVideoIndex = state.video_data.findIndex(
    //     (video) => video.video_id === video_id
    //   );

    //   let updatedVideos = [...state.video_data];

    //   if (existingVideoIndex !== -1) {
    //     // Update the existing video's watchTime
    //     updatedVideos[existingVideoIndex] = {
    //       ...updatedVideos[existingVideoIndex],
    //       watched_time:
    //         updatedVideos[existingVideoIndex].watched_time + watched_time,
    //     };
    //   } else {
    //     // Add new video data
    //     updatedVideos.push({ video_id, watched_time });
    //   }

    //   // Calculate totalWatchTime by summing watched_time of all videos
    //   const totalWatchTime = updatedVideos.reduce(
    //     (acc, video) => acc + video.watched_time,
    //     0
    //   );

    //   const currentDate = new Date().toISOString().split("T")[0];

    //   return {
    //     ...state,
    //     video_data: updatedVideos,
    //     totalWatchTime,
    //     currentDate,
    //   };
    // }

    // case "RESET_VIDEO_WATCH_TIME": {
    //   return {
    //     ...state,
    //     video_data: [],
    //     totalWatchTime: 0,
    //   };
    // }

    default:
      return state;
  }
};

export default videoReducer;
