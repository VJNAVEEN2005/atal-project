import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../Api/api";

export const fetchStartups = createAsyncThunk('fetchStartups', async () => {
  try {
    const response = await axios.get(`${api.web}api/v1/startup`);
    return response.data.data.startups;
  } catch (error) {
    console.error("Error fetching startups data:", error);
    throw error;
  }
});

export const startupPortfolioSlice = createSlice({
  name: 'startupPortfolio',
    initialState: {
        startups: [],
        loading: false,
        error: null,
        activeCategory: "All",
        selectedStartup: null,
        visibleCount: 1,
        isAdvancedFilterOpen: false,
        searchTerm: "",
        categories: ["All"],
    },
    reducers: {
        setActiveCategory: (state, action) => {
            state.activeCategory = action.payload;
        },
        setSelectedStartup: (state, action) => {
            state.selectedStartup = action.payload;
        },
        setVisibleCount: (state, action) => {
            state.visibleCount = action.payload;
        },
        toggleAdvancedFilter: (state) => {
            state.isAdvancedFilterOpen = !state.isAdvancedFilterOpen;
        },
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        },
        setCategories: (state, action) => {
            state.categories = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchStartups.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchStartups.fulfilled, (state, action) => {
                state.loading = false;
                state.startups = action.payload;

                // Extract unique categories from the fetched data
                const uniqueCategories = ["All", ...Array.from(new Set(action.payload.map(startup => startup.category)))];
                state.categories = uniqueCategories;
            })
            .addCase(fetchStartups.rejected, (state, action) => {
                console.error('Error fetching startups:', action.error.message);
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export const { setActiveCategory, setSelectedStartup, setVisibleCount, toggleAdvancedFilter, setSearchTerm, setCategories } = startupPortfolioSlice.actions;
export default startupPortfolioSlice.reducer;
