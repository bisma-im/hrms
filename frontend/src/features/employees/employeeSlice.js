import { createSlice } from '@reduxjs/toolkit';
import { fetchEmployees, addEmployee, updateEmployee, deleteEmployee } from 'actions/employeeActions';

const employeesSlice = createSlice({
  name: 'employee',
  initialState: {
    employees: [],
    loading: 'idle',
    selectedEmployee: null, // additional UI state for demonstration
  },
  reducers: {
    // Reducer to set the currently selected employee
    selectEmployee(state, action) {
      state.selectedEmployee = action.payload;
    },
    // Reducer to clear the selection
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
        state.employees = action.payload;
        state.loading = 'idle';
      })
      .addCase(fetchEmployees.rejected, (state) => {
        state.loading = 'failed';
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.employees.push(action.payload);
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        const index = state.employees.findIndex(emp => emp.id === action.payload.id);
        if (index !== -1) {
          state.employees[index] = action.payload;
        }
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.employees = state.employees.filter(emp => emp.id !== action.payload);
      });
  }
});

export const { selectEmployee, clearSelectedEmployee, editLocalEmployee } = employeesSlice.actions;

export default employeesSlice.reducer;
