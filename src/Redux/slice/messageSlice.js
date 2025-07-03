import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../Api/api";

export const fetchMessages = createAsyncThunk('fetchMessages', async () => {
    try {
        const response = await axios.get(`${api.web}api/v1/message/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching messages data:", error);
        throw error;
    }
});

const messageSlice = createSlice({
    name: 'messages',
    initialState: {
        messages: null,
        loading: false,
        error: false,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMessages.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(fetchMessages.fulfilled, (state, action) => {
                state.loading = false;
                state.messages = action.payload;
            })
            .addCase(fetchMessages.rejected, (state, action) => {
                console.error('Error fetching messages:', action.error.message);
                state.loading = false;
                state.error = true;
            });
    }
});

export default messageSlice.reducer;