import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../Api/api";


export const fetchRoadmap = createAsyncThunk('fetchRoadmap', async () => {

  
    try {
      const response = await axios.get(`${api.web}api/v1/roadmap`);
      
      return response.data;
    } catch (error) {
      console.error("Error fetching Roadmap data:", error);
      throw error;
    }
  });
  


const roadmapSlice = createSlice({
    name: 'roadmap',
    initialState: {
        roadmap: null,
      loading: false,
      error: false,
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchRoadmap.pending, (state) => {
          state.loading = true;
          state.error = false;
        })
        .addCase(fetchRoadmap.fulfilled, (state, action) => {
          state.loading = false;
          state.roadmap = action.payload;
        })
        .addCase(fetchRoadmap.rejected, (state, action) => {
          console.error('Error fetching roadmap:', action.error.message);
          state.loading = false;
          state.error = true;
        });
    }
  });
  


export default roadmapSlice.reducer;