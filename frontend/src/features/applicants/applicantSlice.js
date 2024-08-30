import { createSlice } from '@reduxjs/toolkit';
import { fetchApplicants, addApplicant, updateApplicant, deleteEmployee } from './applicantService';

const applicantSlice = createSlice({
  name: 'applicant',
  initialState: {
    applicants: [],
    loading: 'idle',
    selectedApplicant: null, // For UI state management
  },
  reducers: {
    selectApplicant(state, action) {
      state.selectedApplicant = action.payload;
    },
    clearSelectedApplicant(state) {
      state.selectedApplicant = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchApplicants.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(fetchApplicants.fulfilled, (state, action) => {
        state.applicants = action.payload; 
        state.loading = 'idle';
      })
      .addCase(fetchApplicants.rejected, (state, action) => {
        state.loading = 'failed';
        console.error('Fetch failed:', action.payload);
      })
      .addCase(addApplicant.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(addApplicant.fulfilled, (state, action) => {
        state.applicants.push(action.payload);
        state.loading = 'idle';
      })
      .addCase(addApplicant.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload;
        console.error('Add applicant failed:', action.payload);
      })
      .addCase(updateApplicant.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(updateApplicant.fulfilled, (state, action) => {
        const index = state.applicants.findIndex(applicant => applicant.application_id === action.payload.application_id);
        if (index !== -1) {
          state.applicants[index] = { ...state.applicants[index], ...action.payload };
        }
        state.loading = 'idle';
      })
      .addCase(updateApplicant.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload;
        console.error('Update applicant failed:', action.error);
      });
  }
});

export const { selectApplicant, clearSelectedApplicant } = applicantSlice.actions;

export default applicantSlice.reducer;
