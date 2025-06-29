import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../Api/api";

export const authenticateUser = createAsyncThunk(
    "authenticateUser", async () => {
        try {
            const response = await axios.post(`${api.web}api/v1/authenticate`, {
                token: localStorage.getItem("token"),
            });
            return response.data;
        } catch (error) {
            console.error("Error authenticating user:", error);
            throw error;
        }
    });

const authenticateSlice = createSlice({
    name: "authenticate",
    initialState: {
        isAuthenticated: false,
        admin: 0,
        loading: false,
        error: false,
    },
    extraReducers: (builder) => {
        builder
            .addCase(authenticateUser.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(authenticateUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = action.payload.message === "Token is valid";
                state.admin = action.payload.user.admin

            })
            .addCase(authenticateUser.rejected, (state, action) => {
                console.error("Error authenticating user:", action.error.message);
                state.loading = false;
                state.error = true;
            });
    }
});

export default authenticateSlice.reducer;