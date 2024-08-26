import apiClient from 'api/apiClient';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchEmployees = createAsyncThunk('employees/fetchEmployees', async (_, { rejectWithValue }) => {
  try {
    const response = await apiClient.get('/api/employees');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const addEmployee = createAsyncThunk('employees/addEmployee', async (employeeData, { rejectWithValue }) => {
  try {
    const response = await apiClient.post('/api/employees', employeeData);
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
