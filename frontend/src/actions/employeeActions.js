// employeeActions.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchEmployees = createAsyncThunk('employees/fetchEmployees', async () => {
  const response = await axios.get('/api/employees');
  return response.data;
});

export const addEmployee = createAsyncThunk('employees/addEmployee', async (employeeData) => {
  const response = await axios.post('/api/employees', employeeData);
  return response.data; // Return the new employee with an ID assigned by the backend
});

export const updateEmployee = createAsyncThunk('employees/updateEmployee', async ({ id, data }) => {
  const response = await axios.put(`/api/employees/${id}`, data);
  return response.data; // Return the updated employee data
});

export const deleteEmployee = createAsyncThunk('employees/deleteEmployee', async (id) => {
  await axios.delete(`/api/employees/${id}`);
  return id; // Return the id of the deleted employee to remove it from state
});
