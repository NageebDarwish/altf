import { createSlice } from '@reduxjs/toolkit';

const topicCountsSlice = createSlice({
  name: 'topicCounts',
  initialState: {
    language_learning: 0,
    travel_and_tourism: 0,
    culture: 0,
    food: 0,
    places: 0,
    history: 0,
    famous_people: 0,
    personal_stories: 0,
    daily_life: 0,
    '30_day_streak': 0,
    '100_day_streak': 0,
    '100_input_hours': 0,
    questions: 0,
    answers: 0,
    saved: 0
  },
  reducers: {
    setTopicCounts: (state, action) => {
      return { ...state, ...action.payload };
    },
    updateTopicCount: (state, action) => {
      const { topic, count } = action.payload;
      state[topic] = count;
    }
  },
});

export const { setTopicCounts, updateTopicCount } = topicCountsSlice.actions;
export default topicCountsSlice.reducer;