import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./reducer";
import videoReducer from "./videoReducer";
import userReducer from "./userReducer";
import seriesReducer from "../SeriesSlice/seriesSlice";
import goalReducer from "./goalReducer";
import topicCountsReducer from "./topicCountsSlice";

const rootReducer = combineReducers({
  admin: authReducer,
  video: videoReducer,
  user: userReducer,
  series: seriesReducer,
  goal: goalReducer,
  topicCounts: topicCountsReducer,

});

export default rootReducer;
