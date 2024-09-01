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

export const addJob = async (jobData) => {
    console.log(jobData)

    try {
        const response = await apiClient.post('api/jobs/submit', jobData);
        return response.data; // Handle response data in the component
    } catch (error) {
        console.error('There was a problem fetching jobs:', error);
    }
};

export const fetchJob = async (jobId) => {
    console.log(jobId)
    try {
        const response = await apiClient.get(`/api/jobs/${jobId}`);
        if (response.status !== 200) {
            throw new Error('Network response was not ok');
        }

        return response.data;
    } catch (error) {
        console.error('There was a problem fetching jobs:', error);
    }
}

export const fetchJobs = async () => {
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
