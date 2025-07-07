import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../Api/api";

export const fetchTenders = createAsyncThunk('fetchTenders', async () => {
  try {
    const response = await axios.get(`${api.web}api/v1/getTenders`);
    return response.data;
  } catch (error) {
    console.error("Error fetching tenders data:", error);
    throw error;
  }
}
);

const tendersSlice = createSlice({
  name: 'tenders',
    initialState: {
        tenders: null,
        loading: false,
        error: false,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTenders.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(fetchTenders.fulfilled, (state, action) => {
                state.loading = false;
                state.tenders = action.payload;
            })
            .addCase(fetchTenders.rejected, (state, action) => {
                console.error('Error fetching tenders:', action.error.message);
                state.loading = false;
                state.error = true;
            });
    }
});

export default tendersSlice.reducer;