import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  events: [],
};

export const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setEvents: (state, { payload }) => {
      state.events = [...payload];
    }
  },
});

export const { actions } = eventsSlice;
export default eventsSlice.reducer;
