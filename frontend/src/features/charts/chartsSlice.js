// src/redux/chartsSlice.js
// src/redux/chartsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  genderDistribution: [
    { name: "Male", data: 60 },
    { name: "Female", data: 40 }
  ],
  departmentBudget: [
    { name: "IT", data: 120000 },
    { name: "Marketing", data: 85000 },
    { name: "Sales", data: 50000 }
  ],
  // Add other chart data here
};

const chartsSlice = createSlice({
  name: 'charts',
  initialState,
  reducers: {
    setChartData: (state, action) => {
      state[action.payload.chartId] = action.payload.data;
    },
  },
});

export const { setChartData } = chartsSlice.actions;
export default chartsSlice.reducer;


// src/redux/chartsSlice.js with api
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// export const fetchChartData = createAsyncThunk(
//   'charts/fetchChartData',
//   async (chartId, thunkAPI) => {
//     const response = await axios.get(`https://api.example.com/data/${chartId}`);
//     return response.data;  // Assuming the response has the format we need
//   }
// );

// const initialState = {
//   genderDistribution: [],
//   departmentBudget: [],
//   loading: false,
//   error: null,
// };

// const chartsSlice = createSlice({
//   name: 'charts',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchChartData.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchChartData.fulfilled, (state, action) => {
//         const { chartId, data } = action.payload;
//         state[chartId] = data;
//         state.loading = false;
//       })
//       .addCase(fetchChartData.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       });
//   },
// });

// export default chartsSlice.reducer;
