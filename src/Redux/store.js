// store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice/user.js';
import teamReducer from './slice/teams.js';
import newslettersReducer from './slice/newsletters.js';

export const store = configureStore({
  reducer: {
    user: userReducer,
    teams: teamReducer,
    newsletters: newslettersReducer,
  }
});

