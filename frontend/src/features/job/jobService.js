import { createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from 'api/apiClient';

export const fetchJobsByDepartment = async (departmentId) => {
    try {
        const response = await apiClient.get(`/api/jobs/department/${departmentId}`);

        if (response.status !== 200) {
            throw new Error('Network response was not ok');
        }
        
        return response.data;
    } catch (error) {
        console.error('There was a problem fetching jobs:', error);
    }
};


export const fetchJobs = async() => {
    try {
        const response = await apiClient.get('/api/jobs');

        if (response.status !== 200) {
            throw new Error('Network response was not ok');
        }
        
        return response.data;
    } catch (error) {
        console.error('There was a problem fetching jobs:', error);
    }
};
