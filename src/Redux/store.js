// store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice/userSlice.js';
import teamReducer from './slice/teamsSlice.js';
import newslettersReducer from './slice/newslettersSlice.js';
import roadmapReducer from './slice/roadmapSlice.js';
import eventReducer from './slice/eventSlice.js';
import pressmediaReducer from './slice/pressmediaSlice.js';
import authenticateUser from './slice/authenticateSlice.js';
import imageCarouselReducer from './slice/imageCarouselSlice.js';

export const store = configureStore({
  reducer: {
    user: userReducer,
    teams: teamReducer,
    newsletters: newslettersReducer,
    roadmap: roadmapReducer,
    events: eventReducer,
    pressmedia: pressmediaReducer,
    authenticate: authenticateUser,
    imageCarousel: imageCarouselReducer

  }
});

