import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../Api/api";

export const fetchProgramsForm = createAsyncThunk('fetchProgramsForm', async () => {
  try {
    const response = await axios.get(`${api.web}api/v1/programsform`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Programs Form data:", error);
    throw error;
  }
});

const programsFormSlice = createSlice({
  name: 'programsForm',
  initialState: {
    data: null,
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProgramsForm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProgramsForm.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProgramsForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});


export default programsFormSlice.reducer;
