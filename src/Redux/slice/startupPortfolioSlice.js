import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../Api/api";

// Fetch startups with pagination
export const fetchStartupsPaginated = createAsyncThunk(
  'startupPortfolio/fetchStartupsPaginated',
  async ({ page = 1, limit = 9 }) => {
    try {
      const response = await axios.get(`${api.web}api/v1/startup/paginated?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching paginated startups:", error);
      throw error;
    }
  }
);

// Fetch startups by category
export const fetchStartupsByCategory = createAsyncThunk(
  'startupPortfolio/fetchStartupsByCategory',
  async ({ category, page = 1, limit = 9 }) => {
    try {
      const response = await axios.get(`${api.web}api/v1/startup/category/${category}?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching startups by category:", error);
      throw error;
    }
  }
);

// Search startups
export const searchStartups = createAsyncThunk(
  'startupPortfolio/searchStartups',
  async ({ searchQuery, page = 1, limit = 9 }) => {
    try {
      const response = await axios.get(
        `${api.web}api/v1/startup/search?search=${encodeURIComponent(searchQuery.trim())}&page=${page}&limit=${limit}`
      );
      return response.data;
    } catch (error) {
      console.error("Error searching startups:", error);
      throw error;
    }
  }
);

// Legacy function for backward compatibility
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
        searchResults: [],
        loading: false,
        error: null,
        activeCategory: "All",
        selectedStartup: null,
        isAdvancedFilterOpen: false,
        searchTerm: "",
        categories: ["All", "Ongoing", "Graduated"],
        suggestions: [],
        showSuggestions: false,
        selectedSuggestionIndex: -1,
        pagination: {
          currentPage: 1,
          totalPages: 1,
          totalStartups: 0,
          startupsPerPage: 9,
          hasNextPage: false,
          hasPreviousPage: false
        },
        isSearchMode: false,
        currentPage: 1,
    },
    reducers: {
        setActiveCategory: (state, action) => {
            state.activeCategory = action.payload;
            state.isSearchMode = false;
            state.searchTerm = "";
            state.currentPage = 1;
        },
        setSelectedStartup: (state, action) => {
            state.selectedStartup = action.payload;
        },
        toggleAdvancedFilter: (state) => {
            state.isAdvancedFilterOpen = !state.isAdvancedFilterOpen;
        },
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
            if (!action.payload.trim()) {
                state.isSearchMode = false;
                state.searchResults = [];
                state.suggestions = [];
                state.showSuggestions = false;
                state.selectedSuggestionIndex = -1;
            }
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        setIsSearchMode: (state, action) => {
            state.isSearchMode = action.payload;
        },
        setSuggestions: (state, action) => {
            state.suggestions = action.payload;
        },
        setShowSuggestions: (state, action) => {
            state.showSuggestions = action.payload;
        },
        setSelectedSuggestionIndex: (state, action) => {
            state.selectedSuggestionIndex = action.payload;
        },
        clearSearch: (state) => {
            state.searchTerm = "";
            state.isSearchMode = false;
            state.searchResults = [];
            state.currentPage = 1;
            state.suggestions = [];
            state.showSuggestions = false;
            state.selectedSuggestionIndex = -1;
        }
    },
    extraReducers: (builder) => {
        builder
            // Legacy fetchStartups
            .addCase(fetchStartups.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchStartups.fulfilled, (state, action) => {
                state.loading = false;
                state.startups = action.payload;
                // Categories are fixed: ["All", "Ongoing", "Graduated"]
            })
            .addCase(fetchStartups.rejected, (state, action) => {
                console.error('Error fetching startups:', action.error.message);
                state.loading = false;
                state.error = action.error.message;
            })
            
            // Paginated startups
            .addCase(fetchStartupsPaginated.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchStartupsPaginated.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload.status === 'success') {
                    state.startups = action.payload.data.startups;
                    state.pagination = action.payload.pagination;
                    state.currentPage = action.payload.pagination.currentPage;
                    // Categories are fixed: ["All", "Ongoing", "Graduated"]
                }
            })
            .addCase(fetchStartupsPaginated.rejected, (state, action) => {
                console.error('Error fetching paginated startups:', action.error.message);
                state.loading = false;
                state.error = action.error.message;
            })
            
            // Category-based startups
            .addCase(fetchStartupsByCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchStartupsByCategory.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload.status === 'success') {
                    state.startups = action.payload.data.startups;
                    state.pagination = action.payload.pagination;
                    state.currentPage = action.payload.pagination.currentPage;
                } else if (action.payload.status === 'error' && action.payload.message === 'No startups found for this category') {
                    state.startups = [];
                    state.pagination = {
                        currentPage: 1,
                        totalPages: 1,
                        totalStartups: 0,
                        startupsPerPage: 9,
                        hasNextPage: false,
                        hasPreviousPage: false
                    };
                }
            })
            .addCase(fetchStartupsByCategory.rejected, (state, action) => {
                console.error('Error fetching startups by category:', action.error.message);
                state.loading = false;
                if (action.error.message.includes('404')) {
                    state.startups = [];
                    state.pagination = {
                        currentPage: 1,
                        totalPages: 1,
                        totalStartups: 0,
                        startupsPerPage: 9,
                        hasNextPage: false,
                        hasPreviousPage: false
                    };
                } else {
                    state.error = action.error.message;
                }
            })
            
            // Search startups
            .addCase(searchStartups.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchStartups.fulfilled, (state, action) => {
                state.loading = false;
                state.isSearchMode = true;
                if (action.payload.status === 'success') {
                    state.searchResults = action.payload.data.startups;
                    state.pagination = action.payload.pagination;
                    state.currentPage = action.payload.pagination.currentPage;
                } else if (action.payload.status === 'error' && action.payload.message === 'No startups found matching your search') {
                    state.searchResults = [];
                    state.pagination = {
                        currentPage: 1,
                        totalPages: 1,
                        totalStartups: 0,
                        startupsPerPage: 9,
                        hasNextPage: false,
                        hasPreviousPage: false
                    };
                }
            })
            .addCase(searchStartups.rejected, (state, action) => {
                console.error('Error searching startups:', action.error.message);
                state.loading = false;
                if (action.error.message.includes('404')) {
                    state.searchResults = [];
                    state.pagination = {
                        currentPage: 1,
                        totalPages: 1,
                        totalStartups: 0,
                        startupsPerPage: 9,
                        hasNextPage: false,
                        hasPreviousPage: false
                    };
                } else {
                    state.error = action.error.message;
                }
            });
    }
});

export const { 
  setActiveCategory, 
  setSelectedStartup, 
  toggleAdvancedFilter, 
  setSearchTerm, 
  setCurrentPage, 
  setIsSearchMode, 
  setSuggestions,
  setShowSuggestions,
  setSelectedSuggestionIndex,
  clearSearch 
} = startupPortfolioSlice.actions;
export default startupPortfolioSlice.reducer;
