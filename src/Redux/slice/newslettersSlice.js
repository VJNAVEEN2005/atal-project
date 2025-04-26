import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../Api/api";

export const fetchNewsletters = createAsyncThunk('fetchNewsletters', async () => {

  
    try {
      const response = await axios.get(`${api.web}api/v1/newsletter`);
  
      return response.data;
    } catch (error) {
      console.error("Error fetching Newsletters data:", error);
      throw error;
    }
  });
  


const newslettersSlice = createSlice({
    name: 'newsletters',
    initialState: {
        newsletters: null,
      loading: false,
      error: false,
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchNewsletters.pending, (state) => {
          state.loading = true;
          state.error = false;
        })
        .addCase(fetchNewsletters.fulfilled, (state, action) => {
          state.loading = false;
          state.newsletters = action.payload;
        })
        .addCase(fetchNewsletters.rejected, (state, action) => {
          console.error('Error fetching newsletters:', action.error.message);
          state.loading = false;
          state.error = true;
        });
    }
  });
  


export default newslettersSlice.reducer;