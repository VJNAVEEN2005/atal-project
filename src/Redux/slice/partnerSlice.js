import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../Api/api";

// Fetch all partners (optionally by type)
export const fetchPartners = createAsyncThunk(
  "partners/fetchPartners",
  async (type = null, { rejectWithValue }) => {
    console.log("Fetching partners with type:", type);
    try {
      const params = type ? { type } : {};
      const response = await axios.get(`${api.web}api/v1/partners`, { params });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error fetching partners");
    }
  }
);

// Create a new partner
export const createPartner = createAsyncThunk(
  "partners/createPartner",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${api.web}api/v1/partners`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error creating partner");
    }
  }
);

// Update a partner
export const updatePartner = createAsyncThunk(
  "partners/updatePartner",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${api.web}api/v1/partners/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error updating partner");
    }
  }
);

// Delete a partner
export const deletePartner = createAsyncThunk(
  "partners/deletePartner",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${api.web}api/v1/partners/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error deleting partner");
    }
  }
);

// Update partner order (drag & drop)
export const updatePartnerOrder = createAsyncThunk(
  "partners/updatePartnerOrder",
  async (partners, { rejectWithValue }) => {
    try {
      await axios.put(`${api.web}api/v1/partners/order/update`, { partners });
      return partners;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error updating order");
    }
  }
);

const partnersSlice = createSlice({
  name: "partners",
  initialState: {
    partners: [],
    loading: false,
    error: null,
    success: null,
  },
  reducers: {
    clearPartnersMessage: (state) => {
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchPartners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPartners.fulfilled, (state, action) => {
        state.loading = false;
        state.partners = action.payload;
      })
      .addCase(fetchPartners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create
      .addCase(createPartner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPartner.fulfilled, (state, action) => {
        state.loading = false;
        state.partners.push(action.payload);
        state.success = "Partner created successfully";
      })
      .addCase(createPartner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update
      .addCase(updatePartner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePartner.fulfilled, (state, action) => {
        state.loading = false;
        state.partners = state.partners.map((p) =>
          p._id === action.payload._id ? action.payload : p
        );
        state.success = "Partner updated successfully";
      })
      .addCase(updatePartner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete
      .addCase(deletePartner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePartner.fulfilled, (state, action) => {
        state.loading = false;
        state.partners = state.partners.filter((p) => p._id !== action.payload);
        state.success = "Partner deleted successfully";
      })
      .addCase(deletePartner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Order
      .addCase(updatePartnerOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePartnerOrder.fulfilled, (state) => {
        state.loading = false;
        state.success = "Partner order updated";
      })
      .addCase(updatePartnerOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearPartnersMessage } = partnersSlice.actions;
export default partnersSlice.reducer;