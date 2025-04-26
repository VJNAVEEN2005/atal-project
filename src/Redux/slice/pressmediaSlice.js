import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../Api/api";


export const fetchPressmedia = createAsyncThunk('fetchPressmedia', async () => {

  
    try {
      const response = await axios.get(`${api.web}api/v1/media/sources`);
      
      return response.data;
    } catch (error) {
      console.error("Error fetching Pressmedia data:", error);
      throw error;
    }
  });
  


const pressmediaSlice = createSlice({
    name: 'pressmedia',
    initialState: {
        pressmedia: null,
      loading: false,
      error: false,
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchPressmedia.pending, (state) => {
          state.loading = true;
          state.error = false;
        })
        .addCase(fetchPressmedia.fulfilled, (state, action) => {
          state.loading = false;
          state.pressmedia = action.payload;
        })
        .addCase(fetchPressmedia.rejected, (state, action) => {
          console.error('Error fetching pressmedia:', action.error.message);
          state.loading = false;
          state.error = true;
        });
    }
  });
  


export default pressmediaSlice.reducer;