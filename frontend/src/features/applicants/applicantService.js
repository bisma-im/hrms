import { createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from 'api/apiClient';

export const addApplicant = createAsyncThunk('applicants/addApplicant', async (applicantData, { rejectWithValue }) => {
  console.log('inside add applicant')

  try {
    const response = await apiClient.post('api/applicants/submit', applicantData);
    return response.data.data; // Handle response data in the component
  } catch (error) {
    return rejectWithValue(error.response.data); // Handle errors
  }
});

export const fetchApplicants = createAsyncThunk('applicants/fetchApplicants', async (_, { rejectWithValue }) => {
  try {
    const response = await apiClient.get('/api/applicants');
    console.log(response.data.data)
    if (response.data.data) {
      return response.data.data; // Assuring that the nested data is correctly targeted
    } else {
      return rejectWithValue('No applicants found'); // Handling cases where no data is returned
    }
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const fetchApplicantDetails = createAsyncThunk('applicants/fetchApplicantDetails', async (applicantId, { rejectWithValue }) => {
  try {
    const response = await apiClient.get(`/api/applicants/${applicantId}`);
    console.log(response)
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const updateApplicant = createAsyncThunk('applicants/updateApplicant', async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await apiClient.put(`/api/applicants/${id}`, data);
    console.log(response)
    if (response.status !== 200) { // Assuming response.ok is true if status is 200-299
      throw new Error('Failed to update the applicant.');
    }
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});