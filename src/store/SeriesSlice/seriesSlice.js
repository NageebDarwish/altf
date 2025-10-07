import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  series: [],     
  loading: false, 
  error: null,     
};

const seriesSlice = createSlice({
  name: "series",
  initialState,
  reducers: {
   
    setSeriesList: (state, action) => {
      state.series = action.payload;
      state.loading = false;
      state.error = null;
    },
 
    setLoading: (state) => {
      state.loading = true;
    },

    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    resetSeriesState: () => initialState,
  },
});

export const { setSeriesList, setLoading, setError, resetSeriesState } = seriesSlice.actions;

export default seriesSlice.reducer;
