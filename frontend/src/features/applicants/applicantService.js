import apiClient from 'api/apiClient';

export const submitApplicationForm = async (formData) => {
    try {
      const response = await apiClient.post('api/applicants/submit', formData);
      return response.data; // Handle response data in the component
    } catch (error) {
      throw error.response.data; // Handle errors
    }
  };