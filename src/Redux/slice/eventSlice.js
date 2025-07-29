import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../Api/api";

export const fetchEvents = createAsyncThunk(
  "events/fetchEvents",
  async (params = { page: 1, limit: 10, dates: "" }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${api.web}api/v1/events/paged`, { params });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchEventDates = createAsyncThunk(
  "events/fetchEventDates",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${api.web}api/v1/events/dates`);
      return response.data.dates;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const eventSlice = createSlice({
  name: "events",
  initialState: {
    events: null,
    eventDates: [],
    loading: false,
    error: null,
    totalPages: 1,
    totalEvents: 0
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload.events;
        state.totalPages = action.payload.totalPages;
        state.totalEvents = action.payload.totalEvents;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchEventDates.fulfilled, (state, action) => {
        state.eventDates = action.payload;
      });
  },
});

export default eventSlice.reducer;