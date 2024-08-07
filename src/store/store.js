import { configureStore } from '@reduxjs/toolkit';
import authReducer from 'features/auth/authSlice';
import sidebarReducer from 'features/nav/sidebarSlice';
import themeReducer from 'features/theme/themeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    sidebar: sidebarReducer,
    theme: themeReducer,
  },
});

