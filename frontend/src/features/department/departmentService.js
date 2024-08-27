import { createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from 'api/apiClient';

// Async thunk for fetching departments
export const fetchDepartments = createAsyncThunk('departments/fetchDepartments', async () => {
    const response = await apiClient.get('/api/departments');
    return response.data.departments;
});