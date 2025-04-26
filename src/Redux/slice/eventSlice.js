import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../Api/api";


export const fetchEvents = createAsyncThunk('fetchEvents', async () => {


    try {
        const response = await axios.get(`${api.web}api/v1/events`);
        return response.data;
    } catch (error) {
        console.error("Error fetching Events data:", error);
        throw error;
    }
});



const eventsSlice = createSlice({
    name: 'events',
    initialState: {
        events: null,
        loading: false,
        error: false,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchEvents.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(fetchEvents.fulfilled, (state, action) => {
                state.loading = false;
                state.events = action.payload;
            })
            .addCase(fetchEvents.rejected, (state, action) => {
                console.error('Error fetching events:', action.error.message);
                state.loading = false;
                state.error = true;
            });
    }
});



export default eventsSlice.reducer;