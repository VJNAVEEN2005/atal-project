import {
    createSlice,
    createAsyncThunk
} from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../Api/api";

export const fetchContactData = createAsyncThunk('contact/fetchContactData', async () => {
  try {
    const response = await axios.get(`${api.web}api/v1/contact/getContactData`);
    return response.data.contact;
  } catch (error) {
    console.error("Error fetching contact data:", error);
    throw error;
  }
});

const contactSlice = createSlice({
  name: 'contact',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchContactData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchContactData.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchContactData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export default contactSlice.reducer;