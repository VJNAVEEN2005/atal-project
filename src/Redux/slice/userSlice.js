import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../Api/api";
import { jwtDecode } from "jwt-decode";

export const fetchUser = createAsyncThunk('fetchUser', async () => {
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  console.log("Decoded Token:", decodedToken); // Debugging line to check the token structure
  const userId = decodedToken.id; // Assuming the user ID is stored in the token

  try {
    const response = await axios.post(`${api.web}api/v1/getUser`, { _id: userId });

    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error; // Let Redux Toolkit handle this in .rejected case
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    loading: false,
    error: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        console.error('Error fetching user:', action.error.message);
        state.loading = false;
        state.error = true;
      });
  }
});



export default userSlice.reducer;
