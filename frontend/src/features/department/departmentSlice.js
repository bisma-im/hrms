import { createSlice } from '@reduxjs/toolkit';
import { fetchDepartments } from './departmentService';

const departmentSlice = createSlice({
    name: 'departments',
    initialState: {
        departments: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDepartments.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchDepartments.fulfilled, (state, action) => {
                state.departments = action.payload;
                state.loading = false;
            })
            .addCase(fetchDepartments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export default departmentSlice.reducer;
