// store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice/userSlice.js';
import teamReducer from './slice/teamsSlice.js';
import newslettersReducer from './slice/newslettersSlice.js';

export const store = configureStore({
  reducer: {
    user: userReducer,
    teams: teamReducer,
    newsletters: newslettersReducer,
  }
});

