import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../Api/api";

export const fetchEcosystem = createAsyncThunk('ecosystem/fetchEcosystem', async () => {
  try {
    const response = await axios.get(`${api.web}api/v1/ecosystems/getEcosystemData`);
    return response.data.ecosystem;
  } catch (error) {
    console.error("Error fetching ecosystem data:", error);
    throw error;
  }
});

const ecosystemSlice = createSlice({
  name: 'ecosystem',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEcosystem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEcosystem.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchEcosystem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default ecosystemSlice.reducer;