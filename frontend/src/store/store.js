import { configureStore } from '@reduxjs/toolkit';

import authReducer from 'features/auth/authSlice';
import sidebarReducer from 'features/nav/sidebarSlice';
import themeReducer from 'features/theme/themeSlice';
import chartsReducer from 'features/charts/chartsSlice';
import employeeReducer from 'features/employees/employeeSlice';
import departmentReducer from 'features/department/departmentSlice';
import applicantReducer from 'features/applicants/applicantSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    sidebar: sidebarReducer,
    theme: themeReducer,
    charts: chartsReducer,
    employee: employeeReducer,
    departments: departmentReducer,
    applicant: applicantReducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

