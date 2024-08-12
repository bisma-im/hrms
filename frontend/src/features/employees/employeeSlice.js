// src/features/employees/employeeSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const employeeSlice = createSlice({
  name: 'employee',
  initialState: {
    selectedEmployee: null,
  },
  reducers: {
    selectEmployee: (state, action) => {
      state.selectedEmployee = action.payload;
    },
  },
});

export const { selectEmployee } = employeeSlice.actions;

export default employeeSlice.reducer;
