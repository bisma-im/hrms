import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';

import authReducer from 'features/auth/authSlice';
import sidebarReducer from 'features/nav/sidebarSlice';
import themeReducer from 'features/theme/themeSlice';
import chartsReducer from 'features/charts/chartsSlice';
import employeeReducer from 'features/employees/employeeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    sidebar: sidebarReducer,
    theme: themeReducer,
    charts: chartsReducer,
    employee: employeeReducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

