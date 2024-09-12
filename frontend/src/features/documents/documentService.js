import apiClient from "api/apiClient";

export const addDocument = async (fileData, userId) => {
    console.log(fileData, userId);
    try {
        const response = await apiClient.post(`api/documents/upload/${userId}`, fileData);
        if (response.status !== 201) { // Assuming response.ok is true if status is 200-299
            throw new Error('Failed to upload the document.');
        }

        console.log(response)
        return response;// Handle response data in the component
    } catch (error) {
        console.error('There was a problem fetching the document:', error);
    }
};

export const updateDocument = async ({data, id}) => {
    try {
        const response = await apiClient.put(`/api/documents/${id}`, data);
        if (response.status !== 200) { // Assuming response.ok is true if status is 200-299
            throw new Error('Failed to update the document.');
        }
        console.log(response)
        return response;// Handle response data in the component
    } catch (error) {
        console.error('There was a problem updating the document:', error);
    }
};