import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../Api/api";

export const fetchImageCarousel = createAsyncThunk('fetchImageCarousel', async () => {
  try {
    const response = await axios.get(`${api.web}api/v1/carousel-images`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Image Carousel data:", error);
    throw error;
  }
});

const imageCarouselSlice = createSlice({
  name: 'imageCarousel',
  initialState: {
    images: null,
    loading: false,
    error: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchImageCarousel.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchImageCarousel.fulfilled, (state, action) => {
        state.loading = false;
        state.images = action.payload;
      })
      .addCase(fetchImageCarousel.rejected, (state, action) => {
        console.error('Error fetching image carousel:', action.error.message);
        state.loading = false;
        state.error = true;
      });
  }
});

export default imageCarouselSlice.reducer;