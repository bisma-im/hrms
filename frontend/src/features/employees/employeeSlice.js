import { createSlice } from '@reduxjs/toolkit';
import { fetchEmployees, addEmployee, updateEmployee, deleteEmployee } from './employeeService';

const employeesSlice = createSlice({
  name: 'employee',
  initialState: {
    employees: [],
    loading: 'idle',
    selectedEmployee: null, // For UI state management
  },
  reducers: {
    selectEmployee(state, action) {
      state.selectedEmployee = action.payload;
    },
    clearSelectedEmployee(state) {
      state.selectedEmployee = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.employees = action.payload; // Ensures employees array is updated
        state.loading = 'idle';
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = 'failed';
        console.error('Fetch failed:', action.payload);
      })
      .addCase(addEmployee.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.employees.push(action.payload);
        state.loading = 'idle';
      })
      .addCase(addEmployee.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload;
        console.error('Add employee failed:', action.payload);
      });
  }
});

export const { selectEmployee, clearSelectedEmployee } = employeesSlice.actions;

export default employeesSlice.reducer;
