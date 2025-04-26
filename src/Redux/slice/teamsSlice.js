import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../Api/api";

export const fetchTeam = createAsyncThunk('fetchTeams', async () => {

  
    try {
      const response = await axios.get(`${api.web}api/v1/team`);
      return response.data;
    } catch (error) {
      console.error("Error fetching teams data:", error);
      throw error; // Let Redux Toolkit handle this in .rejected case
    }
  });
  


const teamSlice = createSlice({
    name: 'teams',
    initialState: {
      teams: null,
      loading: false,
      error: false,
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchTeam.pending, (state) => {
          state.loading = true;
          state.error = false;
        })
        .addCase(fetchTeam.fulfilled, (state, action) => {
          state.loading = false;
          state.teams = action.payload;
        })
        .addCase(fetchTeam.rejected, (state, action) => {
          console.error('Error fetching teams:', action.error.message);
          state.loading = false;
          state.error = true;
        });
    }
  });
  


export default teamSlice.reducer;