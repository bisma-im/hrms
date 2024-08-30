import apiClient from 'api/apiClient';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchEmployees = createAsyncThunk('employees/fetchEmployees', async (_, { rejectWithValue }) => {
  try {
    const response = await apiClient.get('/api/employees');
    if (response.data.data) {
      return response.data.data; // Assuring that the nested data is correctly targeted
    } else {
      return rejectWithValue('No employees found'); // Handling cases where no data is returned
    }
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const addEmployee = createAsyncThunk('employees/addEmployee', async (employeeData, { rejectWithValue }) => {
  try {
    console.log(employeeData);

    const response = await apiClient.post('/api/employees/submit', employeeData);
    console.log(response);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const updateEmployee = createAsyncThunk('employees/updateEmployee', async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await apiClient.put(`/api/employees/${id}`, data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const deleteEmployee = createAsyncThunk('employees/deleteEmployee', async (id, { rejectWithValue }) => {
  try {
    await apiClient.delete(`/api/employees/${id}`);
    return id;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
