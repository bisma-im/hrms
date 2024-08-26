import { createSelector } from 'reselect';

// Select the chart data slice from the state
const selectChartData = state => state.charts;

// Create a memoized selector for job positions data
export const selectJobPositionsData = createSelector(
    [selectChartData],
    charts => charts.jobPositions
);
